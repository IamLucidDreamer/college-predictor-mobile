import { Image } from "react-native";

// Enum
// 1 colored Logo
// 2 white Logo

const AppLogo = ({ width = 100, height = 100, style = {}, logotType = 1 }) => {
  switch (logotType) {
    case 1:
      return (
        <Image
          source={require("../../assets/images/careerkick_logo.png")} 
          width={width}
          height={height}
          style={style}
        />
      );
      break;
    case 2:
      return (
        <Image
          source={require("../../assets/images/logo_white.png")}
          width={width}
          height={height}
          style={style}
        />
      );
      break;
  }
};

export default AppLogo;
