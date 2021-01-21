import React from "react";
import RegistrationPage from "../RegistrationPage";
import { mount } from "enzyme";

describe("RegistrationPage", () => {
  describe("clicking the register button", () => {
    it("calls the onRegister handler", () => {
      const registerHandler = jest.fn();

      const wrapper = mount(<RegistrationPage onRegister={registerHandler} />);
      wrapper
        .find('[data-test="firstName"]')
        .simulate("change", { target: { value: "Joe" } });

      wrapper
        .find('[data-test="lastName"]')
        .simulate("change", { target: { value: "Smith" } });

      wrapper
        .find('[data-test="emailID"]')
        .simulate("change", { target: { value: "Joes@gmail.com" } });

      wrapper
        .find('[data-test="password"]')
        .simulate("change", { target: { value: "testpassword@123" } });

      wrapper.find('[data-test="RegisterButton"]').simulate("click");

      expect(registerHandler).toHaveBeenCalledWith('Joe');
    });
  });
});
