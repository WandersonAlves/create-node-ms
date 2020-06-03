import { DataRepository } from '../../interfaces';
import { injectable } from 'inversify';
import { TRestParameters } from '../../../shared/types';
import IPaymentDTO from '../../../infra/dtos/IPaymentDTO';

@injectable()
export default class InMemoryPaymentRepository implements DataRepository<IPaymentDTO> {
  private data: IPaymentDTO[] = [
    {
      name: "Snyder's-Lance, Inc.",
      uuid: '7abbde2a-0a97-400b-95f8-ee174edef163',
      number: 49,
      status: 'pending',
    },
    {
      name: 'Quanta Services, Inc.',
      uuid: 'b312008e-9453-4740-a94a-4f578ff1d860',
      number: 86,
      status: 'paid',
    },
    {
      name: 'ROBO Global Robotics and Automation Index ETF',
      uuid: '9e737c80-ed71-47e3-a71a-d4723afbcb0e',
      number: 14,
      status: 'paid',
    },
    {
      name: 'PRGX Global, Inc.',
      uuid: 'eb044379-3d11-4dc7-99dc-909242f34fd5',
      number: 91,
      status: 'pending',
    },
    {
      name: 'Zendesk, Inc.',
      uuid: 'f92e35a1-cbdf-4eee-8a65-5f984e77fd73',
      number: 60,
      status: 'paid',
    },
    {
      name: 'STRATS Trust',
      uuid: 'f6902283-bb05-4de9-b183-1899b774790e',
      number: 79,
      status: 'pending',
    },
    {
      name: 'MagnaChip Semiconductor Corporation',
      uuid: '981cb8a1-4a6a-4cd9-8da1-79cce9db1830',
      number: 91,
      status: 'pending',
    },
    {
      name: 'Gamestop Corporation',
      uuid: '4c051cf5-907f-492f-91f7-8c206ba41133',
      number: 1,
      status: 'paid',
    },
    {
      name: 'Auris Medical Holding AG',
      uuid: 'a5bdf19b-5735-48eb-8aba-b6bad2c4f301',
      number: 75,
      status: 'pending',
    },
    {
      name: 'Shaw Communications Inc.',
      uuid: 'b04f7e0e-6111-41b1-bba3-082894bbc6f2',
      number: 64,
      status: 'paid',
    },
    {
      name: 'Nuveen Municipal 2021 Target Term Fund',
      uuid: '097d5f7b-b118-4dac-ad58-7909a55af0e5',
      number: 58,
      status: 'paid',
    },
    {
      name: 'Ohr Pharmaceuticals, Inc.',
      uuid: 'c7927c03-38ec-458b-9e21-009796932ceb',
      number: 9,
      status: 'paid',
    },
    {
      name: 'Dividend and Income Fund',
      uuid: 'de2369a4-49f9-483d-aafa-3a6dd5aced05',
      number: 89,
      status: 'paid',
    },
    {
      name: 'Potbelly Corporation',
      uuid: '6ccc9e50-9515-4490-89f6-883f434e2b16',
      number: 9,
      status: 'paid',
    },
    {
      name: 'Toll Brothers Inc.',
      uuid: '1633be9f-890f-453c-92b2-6ace89ef0336',
      number: 74,
      status: 'pending',
    },
    {
      name: 'PIMCO Strategic Income Fund, Inc.',
      uuid: '3d3a3297-538d-4793-a495-81e87841f03f',
      number: 57,
      status: 'pending',
    },
    {
      name: 'Albany International Corporation',
      uuid: '59c23fff-cbbb-4aef-8a6b-611b7a78355f',
      number: 28,
      status: 'pending',
    },
    {
      name: 'Royal Bank Scotland plc (The)',
      uuid: '9e900ded-033d-471b-a68d-7f2256d2e8c1',
      number: 5,
      status: 'paid',
    },
    {
      name: 'NXT-ID Inc.',
      uuid: '36ffa77b-b4b3-4e81-b990-7e298a957883',
      number: 29,
      status: 'pending',
    },
    {
      name: 'Knoll, Inc.',
      uuid: '3f65592c-ca95-4eb8-b0b2-f4d9f6923325',
      number: 77,
      status: 'pending',
    },
    {
      name: 'Lexington Realty Trust',
      uuid: 'd86bc1c3-25ed-459c-8fa1-c3dcc12978b5',
      number: 5,
      status: 'pending',
    },
    {
      name: 'First Trust Small Cap Core AlphaDEX Fund',
      uuid: '92e72f14-4494-45b3-ba04-9274003b9c64',
      number: 92,
      status: 'paid',
    },
    {
      name: 'Hartford Financial Services Group, Inc. (The)',
      uuid: '0d9253a0-052e-4043-a331-cbb8fbec8ba6',
      number: 65,
      status: 'pending',
    },
    {
      name: 'Eaton Vance Tax-Managed Buy-Write Income Fund',
      uuid: 'b38b5e31-4077-4d61-9300-031884c7e32e',
      number: 49,
      status: 'paid',
    },
    {
      name: 'NuVasive, Inc.',
      uuid: '102aee97-2a44-4921-860c-f8d8e3159e56',
      number: 83,
      status: 'paid',
    },
  ];

  find(filter?: TRestParameters<IPaymentDTO>): Promise<IPaymentDTO[]> {
    return Promise.resolve(this.data.slice(filter.skip, filter.limit).filter(e => e));
  }

  create(obj: IPaymentDTO): Promise<IPaymentDTO> {
    this.data.push(obj);
    return Promise.resolve(obj);
  }

  findOne(id: string): Promise<IPaymentDTO> {
    return Promise.resolve(this.data.find(i => i.uuid === id));
  }

  updateById(id: string | number, obj: Partial<IPaymentDTO>): Promise<IPaymentDTO> {
    throw new Error('Method not implemented.');
  }
}
