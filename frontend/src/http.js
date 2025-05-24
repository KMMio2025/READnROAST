export async function fetchUserIsLoggedIn() {
  const response = await fetch("http://localhost:8080/api/users/me", {
    credentials: "include",
  });
  if (response.ok) {
    const user = await response.json();
    console.log("User is logged in");
    return { isLoggedIn: true, user };
  } else {
    console.log("User isn't logged in");
    return { isLoggedIn: false };
  }
}

export async function fetchRegister(enteredUserDetails) {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredUserDetails),
  });
  // Expecting text response for registration status
  const registerStatus = await response.text();

  if (!response.ok) {
    throw new Error(registerStatus || "Failed to register, please try again");
  }

  console.log("Account registered");
  return registerStatus;
}

export async function fetchLogIn(enteredEmail, enteredPassword) {
  const loginData = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  let resData = null;
  try {
    resData = await response.json();
  } catch (e) {
    resData = {};
  }

  if (!response.ok) {
    // Surface backend error messages if present
    throw new Error(resData.message || "Failed to log in");
  }

  return resData;
}