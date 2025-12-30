import Handlebars, { HelperOptions } from 'handlebars';
import { PolicyData } from '../types';

// Helper: fallback to default when value is nullish/empty string
Handlebars.registerHelper('fallback', (value: unknown, defaultValue: unknown, _options?: HelperOptions) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  return value;
});

const RAW_TEMPLATES: Record<string, string> = {
  genericReply: `
{{#if policy}}
尊敬的客户，以下是保单重点信息：
- 保单号：{{fallback policy.id "未提供"}}
- 企业名称：{{fallback policy.companyName "未提供"}}
- 状态：{{fallback policy.status "未知"}}
- 到期日：{{fallback policy.expiryDate "未提供"}}
- 承保类型：{{fallback policy.type "未提供"}}
- 车队数量：{{fallback policy.vehicleCount "未提供"}} 台
{{else}}
我已收到您的问题：{{fallback userMessage "未提供"}}
{{/if}}
{{fallback reply "系统处理中，请稍后再试"}}
`.trim()
};

const compiledTemplates: Record<string, Handlebars.TemplateDelegate> = {};

const getTemplate = (key: string) => {
  if (!compiledTemplates[key]) {
    const raw = RAW_TEMPLATES[key];
    if (!raw) throw new Error(`Template "${key}" not found`);
    compiledTemplates[key] = Handlebars.compile(raw);
  }
  return compiledTemplates[key];
};

export interface ReplyTemplateData {
  policy?: PolicyData | null;
  userMessage?: string;
  reply?: string;
}

export const renderTemplate = (key: keyof typeof RAW_TEMPLATES, data: ReplyTemplateData) => {
  const tpl = getTemplate(key);
  return tpl(data);
};

export const registerTemplate = (key: string, template: string) => {
  compiledTemplates[key] = Handlebars.compile(template);
};
