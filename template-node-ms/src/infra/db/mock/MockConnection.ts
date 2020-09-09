import { DatabaseConnection } from "../../../shared/interfaces";
import { injectable } from "inversify";

@injectable()
export default class MockConnection implements DatabaseConnection {
  async connect(): Promise<this> {
    return this;
  }
  async disconnect(): Promise<void> {
    return null;
  }

}