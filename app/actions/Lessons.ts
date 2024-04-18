"use server";

export const newLesson = async (formData: {}): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/lessons/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
