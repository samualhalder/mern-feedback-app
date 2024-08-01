const checkUser = async () => {
  const response = await fetch("/api/auth/checkuser");

  if (!response.ok) {
    localStorage.removeItem("feedback-user");
  }
};
export default checkUser;
