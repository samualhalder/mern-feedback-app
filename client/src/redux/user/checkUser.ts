const checkUser = async () => {
  try {
    const response = await fetch("/api/auth/checkuser");

    if (!response.ok) {
      localStorage.removeItem("feedback-user");
    }
  } catch (error) {
    console.log(error);
  }
};
export default checkUser;
