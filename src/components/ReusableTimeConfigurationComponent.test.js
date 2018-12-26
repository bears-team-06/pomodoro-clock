import ReusableTimeConfigurationComponent from "./ReusableTimeConfigurationComponent";
import { shallow } from "enzyme";
import React from "react";

describe("ReusableTimeConfigurationComponent", () => {
  describe("when given certain properties", () => {
    it("matches snapshot", () => {
      const timeConfigurationComponent = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={300}
          minimumChange={60}
          maximumLength={3600}
          minimumLength={60}
        />
      );
      expect(timeConfigurationComponent).toMatchSnapshot();
    });

    it("displays correct start time and label", () => {
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={300}
          minimumChange={60}
          maximumLength={3600}
          minimumLength={60}
        />
      );
      const label = wrapper.find("#label");
      expect(label.text()).toBe("Break Length");
      expect(wrapper.find("#time").text().trim()).toBe("5");
      expect(wrapper.find("#increment").prop("disabled")).toBe(false);
      expect(wrapper.find("#decrement").prop("disabled")).toBe(false);
    });
  });

  describe("when pressing increment button", () => {
    it("on Change is called with incremented Value", () => {
      let newTime = null;
      let onChange = newValue => {
        newTime = newValue;
      };
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={300}
          minimumChange={60}
          maximumLength={3600}
          minimumLength={60}
          onChange={onChange}
        />
      );

      wrapper.find("#increment").simulate("click");
      expect(newTime).toBe(360);
    });
  });

  describe("when pressing decrement button", () => {
    it("on Change is called with decremented value", () => {
      let newTime = null;
      let onChange = newValue => {
        newTime = newValue;
      };
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={300}
          minimumChange={60}
          maximumLength={3600}
          minimumLength={60}
          onChange={onChange}
        />
      );
      wrapper.find("#decrement").simulate("click");
      expect(newTime).toBe(240);
    });
  });

  describe("when timeLength is equal or greater than maximumLength", () => {
    it("disables increment button", () => {
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={420}
          minimumChange={60}
          maximumLength={360}
          minimumLength={60}
        />
      );

      expect(
        wrapper
          .find("#time")
          .text()
          .trim()
      ).toBe("7");
      expect(wrapper.find("#increment").prop("disabled")).toBe(true);
    });
  });

  describe("when timeLength is less than or equal to minimumChange", () => {
    it("enables decrement button", () => {
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={60}
          minimumChange={60}
          maximumLength={3600}
          minimumLength={60}
        />
      );
      expect(
        wrapper
          .find("#time")
          .text()
          .trim()
      ).toBe("1");
      expect(wrapper.find("#decrement").prop("disabled")).toBe(true);
    });
  });

  describe("when time length is greater than minimum length and less than maximum length", () => {
    it("enables both increment and decrement buttom", () => {
      const wrapper = shallow(
        <ReusableTimeConfigurationComponent
          labelName="Break Length"
          timeLength={120}
          minimumChange={60}
          maximumLength={360}
          minimumLength={60}
        />
      );
      expect(wrapper.find("#increment").prop("disabled")).toBe(false);
      expect(wrapper.find("#decrement").prop("disabled")).toBe(false);
    });
  });
});
