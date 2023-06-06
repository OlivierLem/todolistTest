
xdescribe('test', () => {
    it('should be test  ', () => {
        expect(2+2).toBe(4)
    });

    it('should be test not ', () => {
        expect(2).not.toBe(1)
    });
});
