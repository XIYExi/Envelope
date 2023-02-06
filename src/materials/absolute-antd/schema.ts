import antdBaseSchema from './base/schema';
import antdControlSchema from './control/schema';
import antdMediaSchema from './media/schema';
import antdSocialSchema from './social/schema';

const antdSchema = {
  ...antdBaseSchema,
  ...antdControlSchema,
  ...antdMediaSchema,
  ...antdSocialSchema
}

export default antdSchema;
