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
  const registerStatus = await response.text();

  if (!response.ok) {
    throw new Error(
      registerStatus.message || "Failed to register, please try again"
    );
  }

  console.log("Acc registered");
  return registerStatus;
}

export async function fetchLogIn(enteredEmail, enteredPassword) {
  const params = new URLSearchParams();
  params.append("username", enteredEmail); // lub enteredUsername
  params.append("password", enteredPassword);

  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    credentials: "include",
  });
  //Backend returns String not JSON -- thats why using response.text()
  const resData = await response.text();

  if (!response.ok) {
    throw new Error(resData || "Failed to log in");
  }

  console.log("Successfully logged in!!!!");
  return resData;
}
