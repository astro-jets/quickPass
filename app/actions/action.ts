"use server";

// Admin Actions
export const getAdminStats = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/adminStats/`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getCustomerStats = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/customerStats/?id=${id}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const searchService = async (query: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/services/search/?query=${query}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
