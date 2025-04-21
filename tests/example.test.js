describe('Multiple Jest Tests in One File', () => {

    test('adds 1 + 2 to equal 3', () => {
      expect(1 + 2).toBe(3);
    });

    test('checks string length', () => {
      const str = 'hello';
      expect(str.length).toBe(5);
    });

    test('array should contain a value', () => {
      const fruits = ['apple', 'banana', 'mango'];
      expect(fruits).toContain('banana');
    });

    test('object should have property', () => {
      const user = { name: 'Syed', role: 'dev' };
      expect(user).toHaveProperty('role', 'dev');
    });

    test('boolean value should be true', () => {
      const isActive = true;
      expect(isActive).toBe(true);
    });

    test('null value should be null', () => {
      const nullValue = null;
      expect(nullValue).toBeNull();
    });

  });
