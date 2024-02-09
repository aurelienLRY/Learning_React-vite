import { describe, it , expect } from "vitest";

describe('Verification de l\'environement de test ', () => {
    
it('Doit retourner true', () => {
expect(true).toBe(false);
  });
  
it('Doit retourner false', () => {
    expect(false).toBe(false);
    });
});

