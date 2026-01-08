import { DietModel } from './diet.model';

describe('DietModel', () => {
  const mockDietList = [
    {
      id: 1,
      diet: "vietnamese",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSizTMOjDQBeDuaL3spDV01JRwjnCzm9wW3Ag&s"
    },
    {
      id: 2,
      diet: "asian",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLL9kpq2FIopxXxLuKR3eVY8V-PKOxkn2-A&s"
    },
    {
      id: 3,
      diet: "international",
      image: "https://cdn-ijnhp.nitrocdn.com/pywIAllcUPgoWDXtkiXtBgvTOSromKIg/assets/images/optimized/rev-5794eaa/www.jaypeehotels.com/blog/wp-content/uploads/2020/09/chinese-1.jpg"
    }
  ];

  it('should create a Diet instance from JSON', () => {
    const json = mockDietList[0];
    const diet = DietModel.fromJson(json);

    expect(diet).toBeInstanceOf(DietModel);
    expect(diet.id).toBe(1);
    expect(diet.diet).toBe('vietnamese');
    expect(diet.image).toBe('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSizTMOjDQBeDuaL3spDV01JRwjnCzm9wW3Ag&s');
    expect(diet.count).toBe(0); 
  });

  it('should convert a Diet instance to JSON', () => {
    const json = mockDietList[1];
    const diet = DietModel.fromJson(json);
    const output = diet.toJson();

    expect(output).toEqual({
      id: 2,
      diet: 'asian',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLL9kpq2FIopxXxLuKR3eVY8V-PKOxkn2-A&s',
      count: 0
    });
  });

  it('should handle count if provided', () => {
    const diet = new DietModel({ id: 10, diet: 'pizza', image: 'url', count: 5 });
    expect(diet.count).toBe(5);
  });

  it('should correctly map an array of diets', () => {
    const diets = mockDietList.map(d => DietModel.fromJson(d));
    expect(diets.length).toBe(3);
    expect(diets[2].diet).toBe('international');
    expect(diets[2].id).toBe(3);
  });

  it('should handle empty JSON gracefully', () => {
    const diet = DietModel.fromJson({ id: 0, diet: '', image: '' });
    expect(diet.id).toBe(0);
    expect(diet.diet).toBe('');
    expect(diet.image).toBe('');
    expect(diet.count).toBe(0);
  });
});
