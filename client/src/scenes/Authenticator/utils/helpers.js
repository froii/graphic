const emailServer = process.env.REACT_APP_MAILER;
const getUrl = (path) => `${emailServer}/${path}`;

export const sendMail = async (path, formValues) => {
  try {
    const response = await fetch(getUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const json = await response.json();
    if (json.status === 200) {
      return json;
    } else {
      console.log(json);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const emailValidation = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};

export const savePasswordOnBD = (user) => {
  localStorage.setItem("userBD", JSON.stringify(user));
};

export const getUserBD = () => JSON.parse(localStorage.getItem("userBD"));

export const savePassword = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => JSON.parse(localStorage.getItem("user"));
