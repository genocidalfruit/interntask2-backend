import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "@/config";
import { Role } from "@/modules/roles/role.model";
import { User } from "@/modules/users/user.model";
import { Asset, IAsset } from "@/modules/assets/asset.model";
import { Ticket } from "@/modules/tickets/ticket.model";
import { Menu } from "@/modules/menus/menu.model";
import { AuditLog } from "@/modules/audit/audit.model";
import { Notification } from "@/modules/notifications/notification.model";
import { RolePermissions } from "@/shared/enums/permissions";
import { AssetStatus, TicketStatus, Priority, NotificationType } from "@/shared/enums";
import { calculateSlaDeadline } from "@/shared/utils/sla";

async function seed() {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to MongoDB");

    await Promise.all([
      Role.deleteMany({}),
      User.deleteMany({}),
      Asset.deleteMany({}),
      Ticket.deleteMany({}),
      Menu.deleteMany({}),
      AuditLog.deleteMany({}),
      Notification.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    const roles = await Role.insertMany(
      Object.entries(RolePermissions).map(([name, permissions]) => ({ name, permissions }))
    );
    console.log(`Seeded ${roles.length} roles`);

    const roleMap: Record<string, any> = {};
    roles.forEach((r) => (roleMap[r.name] = r._id));

    const users = await User.insertMany([
      { name: "Admin User", email: "admin@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Admin },
      { name: "Admin Two", email: "admin2@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Admin },
      { name: "John Technician", email: "john@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Technician },
      { name: "Sarah Tech", email: "sarah@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Technician },
      { name: "Mike Employee", email: "mike@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Employee },
      { name: "Lisa Employee", email: "lisa@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Employee },
      { name: "Tom Auditor", email: "tom@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Auditor },
      { name: "Anna Auditor", email: "anna@demo.com", passwordHash: await bcrypt.hash("password123", 10), roleId: roleMap.Auditor },
    ]);
    console.log(`Seeded ${users.length} users`);

    const categories = ["Laptop", "Monitor", "Server", "Printer", "Mobile", "Desktop", "Network"];
    const statuses = [AssetStatus.AVAILABLE, AssetStatus.ASSIGNED, AssetStatus.MAINTENANCE, AssetStatus.RETIRED];
    const assets: Partial<IAsset>[] = Array.from({ length: 20 }, (_, i) => ({
      assetCode: `AST-${String(i + 1).padStart(3, "0")}`,
      name: `${categories[i % categories.length]} ${i + 1}`,
      category: categories[i % categories.length],
      assignedTo: i % 3 === 0 ? users[i % users.length]._id : undefined,
      status: statuses[i % statuses.length],
      purchaseDate: new Date(2024, i % 12, 1),
      warrantyExpiry: new Date(2026, i % 12, 1),
      notes: `Sample asset ${i + 1}`,
    }));
    const createdAssets = await Asset.insertMany(assets);
    console.log(`Seeded ${createdAssets.length} assets`);

    const tickets = [];
    for (let i = 0; i < 15; i++) {
      const priority = [Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL][i % 4];
      const status = [TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.PENDING, TicketStatus.RESOLVED, TicketStatus.CLOSED][i % 5];
      tickets.push({
        ticketNo: `TK-${String(i + 1).padStart(3, "0")}`,
        assetId: createdAssets[i % createdAssets.length]._id,
        createdBy: users[i % users.length]._id,
        assignedTo: i % 2 === 0 ? users[(i + 2) % users.length]._id : undefined,
        priority,
        status,
        slaDeadline: calculateSlaDeadline(priority),
        resolvedAt: status === TicketStatus.RESOLVED || status === TicketStatus.CLOSED ? new Date() : undefined,
        comments: [{ author: users[i % users.length]._id, body: `Initial report for ticket ${i + 1}`, createdAt: new Date() }],
        attachmentUrls: [],
      });
    }
    const createdTickets = await Ticket.insertMany(tickets);
    console.log(`Seeded ${createdTickets.length} tickets`);

    const menus = await Menu.insertMany([
      { label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard", permissions: ["dashboard.view"], order: 1 },
      { label: "Assets", icon: "Package", path: "/assets", permissions: ["asset.view"], order: 2 },
      { label: "Tickets", icon: "Ticket", path: "/tickets", permissions: ["ticket.view"], order: 3 },
      { label: "Users", icon: "Users", path: "/users", permissions: ["user.view"], order: 4 },
      { label: "Roles", icon: "Shield", path: "/roles", permissions: ["role.manage"], order: 5 },
      { label: "Audit Logs", icon: "ScrollText", path: "/audit", permissions: ["audit.view"], order: 6 },
      { label: "Notifications", icon: "Bell", path: "/notifications", permissions: ["notification.view"], order: 7 },
    ]);
    console.log(`Seeded ${menus.length} menus`);

    await AuditLog.insertMany([
      { actor: users[0]._id, action: "Asset Created", entityType: "Asset", entityId: createdAssets[0]._id, after: { name: createdAssets[0].name }, traceId: "seed-1" },
      { actor: users[0]._id, action: "Ticket Created", entityType: "Ticket", entityId: createdTickets[0]._id, after: { ticketNo: createdTickets[0].ticketNo }, traceId: "seed-2" },
      { actor: users[2]._id, action: "Ticket Assigned", entityType: "Ticket", entityId: createdTickets[1]._id, after: { assignedTo: users[3]._id.toString() }, traceId: "seed-3" },
      { actor: users[0]._id, action: "User Created", entityType: "User", entityId: users[4]._id, after: { name: users[4].name }, traceId: "seed-4" },
      { actor: users[0]._id, action: "Role Updated", entityType: "Role", entityId: roleMap.Technician, after: { permissions: RolePermissions.Technician }, traceId: "seed-5" },
    ]);
    console.log("Seeded 5 audit logs");

    const technicianUsers = users.filter((u) => u.roleId.toString() === roleMap.Technician.toString());
    const notifications = [];
    for (const tech of technicianUsers) {
      for (let i = 0; i < 3; i++) {
        notifications.push({
          userId: tech._id,
          type: NotificationType.TICKET_ASSIGNED,
          message: `Ticket TK-${String(i + 1).padStart(3, "0")} has been assigned to you`,
          read: false,
          entityId: createdTickets[i]._id,
        });
      }
    }
    await Notification.insertMany(notifications);
    console.log(`Seeded ${notifications.length} notifications`);

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();