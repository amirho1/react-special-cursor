/**
 * This module comes from react-animated-cursor (https://github.com/stephenscaff/react-animated-cursor)
 * @function IsDevice
 */

const IsDevice = (() => {
  if (typeof navigator == "undefined") return;

  const ua = navigator.userAgent;

  return {
    info: ua,

    Android() {
      return ua.match(/Android/i);
    },
    BlackBerry() {
      return ua.match(/BlackBerry/i);
    },
    IEMobile() {
      return ua.match(/IEMobile/i);
    },
    iOS() {
      return ua.match(/iPhone|iPad|iPod/i);
    },
    OperaMini() {
      return ua.match(/Opera Mini/i);
    },

    /**
     * Any Device
     */
    any() {
      if (IsDevice)
        return (
          IsDevice.Android() ||
          IsDevice.BlackBerry() ||
          IsDevice.iOS() ||
          IsDevice.OperaMini() ||
          IsDevice.IEMobile()
        );
    },
  };
})();

// Export
export default IsDevice;
