import semanticSocialSchema from '@/materials/absolute-semantic/social/schema';
import semanticBaseSchema from '@/materials/absolute-semantic/base/schema';
import semanticControlSchema from '@/materials/absolute-semantic/control/schema';
import semanticMediaSchema from '@/materials/absolute-semantic/media/schema';

const semanticSchema = {
  ...semanticBaseSchema,
  ...semanticControlSchema,
  ...semanticMediaSchema,
  ...semanticSocialSchema,
};

export default semanticSchema;
