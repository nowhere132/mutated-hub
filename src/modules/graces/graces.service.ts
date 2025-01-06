import { CollectGraceDto } from './graces.interface';

const collect = async (req: CollectGraceDto): Promise<number> => {
  return Promise.resolve(1);
};

const enhance = async () => {};

const show = async () => {};

export { collect, enhance, show };
