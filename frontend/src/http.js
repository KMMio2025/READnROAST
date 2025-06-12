const API_BASE_URL = "https://readnroast-production.up.railway.app";

export async function fetchUserIsLoggedIn() {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    return { isLoggedIn: true, user };
  } else {
    return { isLoggedIn: false };
  }
}

export async function fetchRegister(enteredUserDetails) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredUserDetails),
    credentials: "include",
  });

  const registerStatus = await response.text();

  if (!response.ok) {
    throw new Error(registerStatus || "Failed to register, please try again");
  }

  return registerStatus;
}

export async function fetchLogIn(enteredEmail, enteredPassword) {
  const loginData = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to log in");
  }

  const resData = await response.json();
  if (resData.email) {
    loginData.email = resData.email;
  }
  if (resData.password) {
    loginData.password = resData.password;
  }
  if (resData.token) {
    localStorage.setItem("token", resData.token);
  } else {
    throw new Error("No token received from server");
  }

  return loginData;
}

export async function fetchLogOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
}
export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/api/products/all?${params.toString()}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
