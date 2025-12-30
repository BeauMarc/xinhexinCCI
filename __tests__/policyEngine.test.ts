import { generateSystemInstruction, CLJHBA_POLICY } from '../services/policyEngine';

describe('policyEngine', () => {
  it('includes policy JSON and role context', () => {
    const ctx = 'Test Role Context';
    const instruction = generateSystemInstruction(ctx);
    expect(instruction).toContain(ctx);
    expect(instruction).toContain('CLJHBA AI SYSTEM POLICY');
    expect(instruction).toContain(JSON.stringify(CLJHBA_POLICY, null, 2));
  });

  it('mentions 95519 mandatory responses and rules', () => {
    const instruction = generateSystemInstruction();
    expect(instruction).toMatch(/mandatory_responses/);
    expect(instruction).toMatch(/Forbidden Phrases/);
    expect(instruction).toMatch(/95519/);
  });
});
