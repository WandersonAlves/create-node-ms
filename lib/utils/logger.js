"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.jsonString = void 0;
const winston_1 = require("winston");
const path_1 = require("path");
const { printf, colorize } = winston_1.format;
const colorizer = colorize();
const timestampFormatter = () => new Date().toISOString();
const consoleFormatter = printf(({ stack, level, message, label, timestamp }) => {
    const levelLabelColorized = colorizer.colorize(level, `${level}:${label}`);
    const timestampColorized = `\u{1b}[90;1m${new Date(timestamp).toLocaleTimeString('pt-BR', { hour12: false })}\u{1b}[0m`;
    return `${timestampColorized} ${levelLabelColorized}: ${stack ? stack : message}`;
});
const baseLogger = winston_1.createLogger({
    level: 'info',
    defaultMeta: { label: 'main' },
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp({ format: timestampFormatter })),
});
/**
 * Returns a pretty represetation of a json for a give object
 *
 * @param obj An object
 */
exports.jsonString = (obj) => `\n${JSON.stringify(obj, null, 2)}\n`;
baseLogger
    .add(new winston_1.transports.Console({
    format: consoleFormatter,
}))
    .add(new winston_1.transports.File({
    format: consoleFormatter,
    filename: path_1.join(__dirname, '..', '..', 'log.log'),
}));
exports.logger = baseLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBMkQ7QUFDM0QsK0JBQTRCO0FBRTVCLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQztBQUNwQyxNQUFNLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztBQUU3QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFMUQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQTZCLEVBQUUsRUFBRTtJQUN6RyxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0UsTUFBTSxrQkFBa0IsR0FBRyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDeEgsT0FBTyxHQUFHLGtCQUFrQixJQUFJLG1CQUFtQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLHNCQUFZLENBQUM7SUFDOUIsS0FBSyxFQUFFLE1BQU07SUFDYixXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQzlCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztDQUN6RyxDQUFDLENBQUM7QUFFSDs7OztHQUlHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFFOUUsVUFBVTtLQUNQLEdBQUcsQ0FDRixJQUFJLG9CQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7Q0FDekIsQ0FBQyxDQUNIO0tBQ0EsR0FBRyxDQUNGLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUM7SUFDbEIsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixRQUFRLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQztDQUNqRCxDQUFDLENBQ0gsQ0FBQztBQUVTLFFBQUEsTUFBTSxHQUFHLFVBQVUsQ0FBQyJ9