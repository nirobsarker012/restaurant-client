const API_URL = `${import.meta.env.VITE_API_URL}all-foods`;

export const getAllFoods = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
};

// top food collection
export const topFoods = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("failed to fetch apps data");
    }
    const data = await res.json();
    const topFoodItems = data
      ?.filter((app) => app.rating >= 4.5)
      ?.sort((a, b) => b?.rating - a?.rating)
      ?.slice(0, 6);
    return topFoodItems;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
};

//get singleFoodsItems
export const singleFood = async (foodId) => {
  try {
    const res = await fetch(API_URL + `/${foodId}`);
    const data = await res.json();
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
};
