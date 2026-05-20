"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.UserStatus = exports.Priority = exports.TicketStatus = exports.AssetStatus = void 0;
var AssetStatus;
(function (AssetStatus) {
    AssetStatus["AVAILABLE"] = "AVAILABLE";
    AssetStatus["ASSIGNED"] = "ASSIGNED";
    AssetStatus["MAINTENANCE"] = "MAINTENANCE";
    AssetStatus["RETIRED"] = "RETIRED";
    AssetStatus["LOST"] = "LOST";
})(AssetStatus || (exports.AssetStatus = AssetStatus = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["PENDING"] = "PENDING";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "LOW";
    Priority["MEDIUM"] = "MEDIUM";
    Priority["HIGH"] = "HIGH";
    Priority["CRITICAL"] = "CRITICAL";
})(Priority || (exports.Priority = Priority = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["TICKET_ASSIGNED"] = "TICKET_ASSIGNED";
    NotificationType["SLA_BREACH"] = "SLA_BREACH";
    NotificationType["MAINTENANCE_DUE"] = "MAINTENANCE_DUE";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=index.js.map