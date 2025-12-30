import { IntentDefinition } from '../types';

export const INTENT_CONFIG: IntentDefinition[] = [
  {
    id: 'policy_query',
    name: '保单查询',
    keywords: ['保单', '查询', 'POL-', 'policy', '保单号'],
    threshold: 0.6,
  },
  {
    id: 'claim',
    name: '理赔咨询',
    keywords: ['理赔', '赔付', '报案', '事故', '损失'],
    threshold: 0.6,
  },
  {
    id: 'product',
    name: '产品咨询',
    keywords: ['车险', '商用车', '报价', '费率', '承保'],
    threshold: 0.6,
  },
  {
    id: 'supervisor',
    name: '主管辅导',
    keywords: ['主管', '辅导', '培训', '指导'],
    threshold: 0.55,
  }
];
