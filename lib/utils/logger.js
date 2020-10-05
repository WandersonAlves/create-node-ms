"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.jsonString = void 0;
const winston_1 = require("winston");
const { printf, colorize } = winston_1.format;
const colorizer = colorize();
const timestampFormatter = () => new Date().toLocaleString('pt-BR', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});
const consoleFormatter = printf(({ stack, level, message, label, timestamp }) => {
    const levelLabelColorized = colorizer.colorize(level, `${level}:${label}`);
    const timestampColorized = `\u{1b}[90;1m${new Date(timestamp).toLocaleTimeString('pt-BR', { hour12: false })}\u{1b}[0m`;
    return `${timestampColorized} ${levelLabelColorized}: ${stack ? stack : message}`;
});
const baseLogger = winston_1.createLogger({
    level: 'info',
    defaultMeta: { label: 'main' },
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp({ format: timestampFormatter })),
    transports: new winston_1.transports.Console({
        format: consoleFormatter,
    }),
});
/**
 * Returns a pretty representation of a json for a give object
 * @param obj An object
 */
exports.jsonString = (obj) => `\n${JSON.stringify(obj, null, 2)}\n`;
exports.logger = baseLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBMkQ7QUFFM0QsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxnQkFBTSxDQUFDO0FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBRTdCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFLENBQzlCLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtJQUNqQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVE7Q0FDM0QsQ0FBQyxDQUFDO0FBRUwsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQTZCLEVBQUUsRUFBRTtJQUN6RyxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDeEgsT0FBTyxHQUFHLGtCQUFrQixJQUFJLG1CQUFtQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLHNCQUFZLENBQUM7SUFDOUIsS0FBSyxFQUFFLE1BQU07SUFDYixXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQzlCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUN4RyxVQUFVLEVBQUUsSUFBSSxvQkFBVSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxNQUFNLEVBQUUsZ0JBQWdCO0tBQ3pCLENBQUM7Q0FDSCxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDVSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUVqRSxRQUFBLE1BQU0sR0FBRyxVQUFVLENBQUMifQ==