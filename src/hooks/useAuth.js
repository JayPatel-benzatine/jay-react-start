import axios from "axios";
import { useState, useEffect } from "react";
import axiosConfig from "../Utils/axiosConfig";
import {baseURL} from "../baseURL"

const useAuth = () => {
  const [user, setUser] = useState({});
  const [tempEmail, setTempEmail] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [authError, setAuthError] = useState("");
  const [userNameValidation, setUserNameValidation] = useState({
    success: "",
    error: "",
  });
  const [verifyEmailValidation, setVerifyEmailValidation] = useState({
    success: "",
    error: "",
  });
  const [verifyfillPassword, setVerifyFillPassword] = useState({
    success: "",
    error: "",
  });
  const [userNameLoader, setUserNameLoader] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);

  // Check user name
  const CheckUserName = (userName) => {
    setUserNameLoader(true);
    axios
      .get(`${baseURL}/api/auth/checkusername?username=${userName}`)
      .then((res) => {
        setUserNameValidation({ success: res.data.message });
      })
      .catch((err) => {
        //console.log("Error", err.message);
        setUserNameValidation({ error: err.response.data.message });
      })
      .finally(() => setUserNameLoader(false));
  };

  // Sign Up the user
  const handleSignUpUser = (
    email,
    fullName,
    username,
    password,
    confirmPassword,
    navigate
  ) => {
    setAuthLoader(true);
    if (userNameValidation.success === "Username is Available") {
      //console.log(password);
      //console.log(confirmPassword);

      axios
        .post(`${baseURL}/api/auth/register`, {
          email,
          fullName,
          username,
          password,
          confirmPassword,
        })
        .then((res) => {
          //console.log(res.data);
          if (res.data.statuscode === 200) {
            setTempEmail({ email: email });
            navigate(`/authentication/email-verification/${email}/`);
          }
        })
        .catch((err) => {
          //console.log(err.response);
          setAuthError(err.response.data.message);
        })
        .finally(() => setAuthLoader(false));
    } else {
      setAuthLoader(false);
      return;
    }
  };

  const handleSetUser = (accessToken) => {
    setUser({ accessToken });
  }

  // Sign in the user
  const handleSignInUser = (
    email,
    password,
    navigate,
    location,
    callbackURL
  ) => {
    setAuthError("");
    setAuthLoader(true);

    axios
      .post(`${baseURL}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.statuscode === 200) {
          setUser(res.data.body);


          const destination = location?.state?.from || "/";
          if (callbackURL) {
            navigate(callbackURL);
          } else {
            navigate(destination);
          }
        }
      })
      .catch((err) => {
        //console.log("Error", err.message);
        //console.log("Response", err.response);
        setAuthError(err.response.data.message);
      })
      .finally(() => setAuthLoader(false));
  };

  const handleInitialEmailVerification = (verificationCode, navigate) => {
    setAuthLoader(true);
    //console.log(`in ${JSON.stringify(verificationCode)}`);
    axios
      .post(`${baseURL}/api/auth/verifyaccount`, {
        verificationCode: verificationCode.verificationCode,
        email: verificationCode.email,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.statuscode === 200) {
          setUser(res.data.body);
          navigate("/");
        }
        if (res.data.message === "User is already verified") {
          setUser(res.data.body);
        }
        return res.data;
      })
      .catch((err) => {
        //console.log(err.response);
        setAuthError(err.response.data.message);
      })
      .finally(() => setAuthLoader(false));
  };

  const getUserProfile = () => {
    setAuthLoader(true);

    axios
      .get(`${baseURL}/api/account/myprofile`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'cache-control': 'no-cache',
          Pragma: 'no-store',
          Expires: '0',
        },
      })
      .then((res) => {
        //console.log(JSON.stringify(res.data.body));
        if (res.data.statuscode === 200) {
          //console.log(`${res.data.body}`);
          setUserProfile(res.data.body);
        }
      })
      .catch((err) => {
        //console.log(err.message);
      })
      .finally(() => setAuthLoader(false));
  };

  //update user profile
  const updateUserProfile = async ({
    fullName,
    username,
    mobileNumber,
    avatar,
    bio,
    coverImage,
    navigate,
  }) => {
    setAuthLoader(true);
    let a = userNameValidation;

    const data = new FormData();

    data.append("fullName", fullName);
    if (username) {
      data.append("username", username);
    }

    data.append("mobileNumber", mobileNumber);
    data.append("avatar", avatar);
    data.append("bio", bio);
    data.append("coverImage", coverImage);

    try{
      const res = await axiosConfig.put(`${baseURL}/api/account/myprofile`, data);
      if (res.data.statuscode === 200) {
        getUserProfile();
        navigate("/profile/user-profile");
      }
      setAuthLoader(false)
      return res;
    } catch (err){
      setAuthError(err.response.data.message);
      setAuthLoader(false)
      return err;
    }
  };

  const clearVerifyEmailValidation = () => {
    setVerifyEmailValidation({
      success: "",
      error: "",
    });
  };

  //reset password
  const handleResetPassword = (email, navigate) => {
    setAuthLoader(true);
    //console.log(email);
    axios
      .put(`${baseURL}/api/auth/reset-account-password`, {
        email: email,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.statuscode === 200) {
          setVerifyEmailValidation({ success: res.data.message });
          // navigate('/authentication/set-password');
        }
      })
      .catch((err) => {
        setVerifyEmailValidation({ error: err.response.data.message });
        //console.log(err.response);
      })
      .finally(() => setAuthLoader(false));
  };

  //change password
  const handleResetPasswordChangePassword = (
    password,
    confirmPassword,
    token,
    navigate
  ) => {
    setAuthLoader(true);
    //console.log(`pass: ${password} cnfm: ${confirmPassword} token: ${token}`);
    axios
      .put(`${baseURL}/api/auth/resetpassword-changepassword`, {
        resetPasswordToken: token,
        newPassword: password,
        confirmPassword,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.statuscode === 200) {
          setVerifyFillPassword({ success: res.data.message });
          navigate("/authentication/sign-in");
        }
      })
      .catch((err) => {
        //console.log(err.response);
        setVerifyFillPassword({ error: err.response.data.message });
      })
      .finally(() => setAuthLoader(false));
  };

  useEffect(() => {
    if (user?.accessToken) {
      getUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user?.accessToken) {
      localStorage.setItem("users", JSON.stringify(user));
    }

    if (userProfile?.userId) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [user, userProfile]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("users"));
    const localUserProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (localUserProfile?.userId) {
      setUserProfile(localUserProfile);
    }

    if (localUser?.accessToken) {
      setUser(localUser);
    } else {
      setUser({});
    }
  }, []);

  // Log out the user
  const handleLogOut = (navigate) => {
    setUser({});
    setUserProfile({});
    localStorage.setItem("isWalletConnected", false);
    localStorage.setItem("walletType", "");

    localStorage.removeItem("users");
    localStorage.removeItem("userProfile");
    if (navigate) {
      navigate(`/`);
    }
  };

  //google Sign in
  const GoogleSignIn = async (response, navigate, location, callbackURL) => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/googlelogin`, {
        idToken: response,
      });

      if (res.data.statuscode === 200) {
        setUser(res.data.body);

        const destination = location?.state?.from || "/";
        if (callbackURL) {
          navigate(callbackURL);
        } else {
          navigate(destination);
        }
      }
      return false;
    } catch (err) {
      return err;
    }
  };

  return {
    user,
    userProfile,
    authLoader,
    userNameValidation,
    userNameLoader,
    authError,
    verifyEmailValidation,
    verifyfillPassword,
    handleSetUser,
    handleInitialEmailVerification,
    CheckUserName,
    handleSignUpUser,
    handleSignInUser,
    handleLogOut,
    handleResetPassword,
    clearVerifyEmailValidation,
    updateUserProfile,
    handleResetPasswordChangePassword,
    GoogleSignIn,
  };
};

export default useAuth;
