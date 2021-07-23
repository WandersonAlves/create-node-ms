#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./cmd/index");
const create_node_serverless_1 = require("./scripts/create-node-serverless");
const commander_1 = require("commander");
const program = commander_1.createCommand();
program.version('0.0.1', '-v, --version');
index_1.GenerateServerlessCommand(program, 'node-serverless-express', 'Create a serverless framework project with TypeScript using aws-serverless-express', create_node_serverless_1.CreateNodeServerlessExpress);
index_1.GenerateServerlessCommand(program, 'nse', 'Create a serverless framework project with TypeScript using aws-serverless-express', create_node_serverless_1.CreateNodeServerlessExpress);
index_1.GenerateServerlessCommand(program, 'node-serverless-lambda', 'Create a serverless framework project with TypeScript', create_node_serverless_1.CreateNodeServerlessLambda);
index_1.GenerateServerlessCommand(program, 'nsl', 'Create a serverless framework project with TypeScript', create_node_serverless_1.CreateNodeServerlessLambda);
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXdEO0FBQ3hELDZFQUEyRztBQUMzRyx5Q0FBMEM7QUFFMUMsTUFBTSxPQUFPLEdBQUcseUJBQWEsRUFBRSxDQUFDO0FBRWhDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRTFDLGlDQUF5QixDQUN2QixPQUFPLEVBQ1AseUJBQXlCLEVBQ3pCLG9GQUFvRixFQUNwRixvREFBMkIsQ0FDNUIsQ0FBQztBQUVGLGlDQUF5QixDQUN2QixPQUFPLEVBQ1AsS0FBSyxFQUNMLG9GQUFvRixFQUNwRixvREFBMkIsQ0FDNUIsQ0FBQztBQUVGLGlDQUF5QixDQUN2QixPQUFPLEVBQ1Asd0JBQXdCLEVBQ3hCLHVEQUF1RCxFQUN2RCxtREFBMEIsQ0FDM0IsQ0FBQztBQUVGLGlDQUF5QixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsdURBQXVELEVBQUUsbURBQTBCLENBQUMsQ0FBQztBQUUvSCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9