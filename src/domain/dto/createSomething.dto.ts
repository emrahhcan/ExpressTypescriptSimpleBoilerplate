import Joi from 'joi';

export interface CreateSomethingDto {
  something: string;
}

export const createSomethingSchema = Joi.object<CreateSomethingDto>({
  something: Joi.string().required(),
});
