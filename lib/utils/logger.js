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
    level: 'info',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBMkQ7QUFDM0QsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxnQkFBTSxDQUFDO0FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBRTdCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFLENBQzlCLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtJQUNqQyxRQUFRLEVBQUUsbUJBQW1CO0NBQzlCLENBQUMsQ0FBQztBQUVMLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUE2QixFQUFFLEVBQUU7SUFDekcsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sa0JBQWtCLEdBQUcsZUFBZSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQ3hILE9BQU8sR0FBRyxrQkFBa0IsSUFBSSxtQkFBbUIsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDcEYsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxzQkFBWSxDQUFDO0lBQzlCLEtBQUssRUFBRSxNQUFNO0lBQ2IsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtJQUM5QixhQUFhO0lBQ2IsTUFBTSxFQUFFLGdCQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0NBQ3pHLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUNVLFFBQUEsVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBRTlFLFVBQVUsQ0FBQyxHQUFHLENBQ1osSUFBSSxvQkFBVSxDQUFDLE9BQU8sQ0FBQztJQUNyQixNQUFNLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUMsQ0FDSCxDQUFDO0FBRVcsUUFBQSxNQUFNLEdBQUcsVUFBVSxDQUFDIn0=