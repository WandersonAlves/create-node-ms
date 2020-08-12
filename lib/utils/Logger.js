"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.jsonString = void 0;
const winston_1 = require("winston");
const { printf, colorize } = winston_1.format;
const colorizer = colorize();
const timestampFormatter = () => new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
});
const consoleFormatter = printf(({ stack, level, message, label, timestamp }) => {
    const levelLabelColorized = colorizer.colorize(level, `${level}:${label}`);
    const timestampColorized = `\u{1b}[90;1m${new Date(timestamp).toLocaleTimeString('pt-BR', { hour12: false })}\u{1b}[0m`;
    return `${timestampColorized} ${levelLabelColorized}: ${stack ? stack : message}`;
});
const baseLogger = winston_1.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    defaultMeta: { label: 'main' },
    // @ts-ignore
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp({ format: timestampFormatter })),
});
/**
 * Returns a pretty represetation of a json for a give object
 * @param obj An object
 */
exports.jsonString = (obj) => `\n${JSON.stringify(obj, null, 2)}\n`;
baseLogger.add(new winston_1.transports.Console({
    format: consoleFormatter,
}));
exports.logger = baseLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUEyRDtBQUMzRCxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLGdCQUFNLENBQUM7QUFDcEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7QUFFN0IsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUUsQ0FDOUIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO0lBQ2pDLFFBQVEsRUFBRSxtQkFBbUI7Q0FDOUIsQ0FBQyxDQUFDO0FBRUwsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQTZCLEVBQUUsRUFBRTtJQUN6RyxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDeEgsT0FBTyxHQUFHLGtCQUFrQixJQUFJLG1CQUFtQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLHNCQUFZLENBQUM7SUFDOUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO0lBQy9ELFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDOUIsYUFBYTtJQUNiLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztDQUN6RyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDVSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUU5RSxVQUFVLENBQUMsR0FBRyxDQUNaLElBQUksb0JBQVUsQ0FBQyxPQUFPLENBQUM7SUFDckIsTUFBTSxFQUFFLGdCQUFnQjtDQUN6QixDQUFDLENBQ0gsQ0FBQztBQUVXLFFBQUEsTUFBTSxHQUFHLFVBQVUsQ0FBQyJ9