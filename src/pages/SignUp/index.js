import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import userService from "../../api/auth";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import "./signup.scss";
import { useNavigate } from "react-router";
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      fetchData(values);
    },
  });

  const [show, setShow] = useState(false);
  const fetchData = async (values) => {
    try {
      const response = await userService.getSignupDetails(values);
      console.log(response);
      localStorage.setItem("teamName", response.teamName);
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.userId);
      setShow(false);
      if (response) navigate("/home");
    } catch (error) {
      console.log(error.response.data.error);
      setShow(true);
    }
  };
  const [selectTeam, setSelectTeam] = useState("");

  const handleChange = (event) => {
    setSelectTeam(event.target.value);
    formik.values.team = event.target.value;
  };

  const navigate = useNavigate();

  return (
    <div style={{ width: "75%" }}>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel className="inputLabel">Name</InputLabel>
        <InputBase
          style={{ padding: "0px 10px" }}
          id="name"
          name="name"
          type="text"
          className="inputBase"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <InputLabel className="inputLabel">Email</InputLabel>
        <InputBase
          style={{ padding: "0px 10px" }}
          id="email"
          name="email"
          type="email"
          className="inputBase"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <InputLabel className="inputLabel">Password</InputLabel>
        <InputBase
          style={{ padding: "0px 10px" }}
          id="password"
          name="password"
          type="password"
          className="inputBase"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <br />

        {show && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            Invalid Credentials
          </div>
        )}
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#383838",
            borderColor: "transparent",
            width: "100%",
            height: "50px",
            marginTop: "15px",
          }}
        >
          SignUp
        </Button>
      </form>
      <div className="registerDiv">
        Already have an account?
        <span
          style={{ color: "#383838", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

function Signup() {
  return (
    <div className="signuppage">
      <div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          SignUp
        </div>
        <div className="signupConatainer">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Signup;
