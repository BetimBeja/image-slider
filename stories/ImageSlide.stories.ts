import type { Meta, StoryObj } from "@storybook/html";
import type { IInputs, IOutputs } from "../ImageSlide/generated/ManifestTypes";

import * as ReactDOM from "react-dom";
import { useArgs } from "@storybook/client-api";

import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
} from "@shko.online/componentframework-mock";

import { ImageSlide as Component } from "../ImageSlide/index";

import "../node_modules/yet-another-react-lightbox/dist/styles.css";
import "../ImageSlide/css/image-slider.css";

import image1 from "./images/Image1.png";
import image2 from "./images/Image2.png";
import image3 from "./images/Image3.png";

interface StoryArgs {
  isVisible: boolean;
  isDisabled: boolean;
  Images: {
    ImageContent: string;
    ImageName: string;
  };
}

export default {
  title: "Image Slide",
  argTypes: {
    isDisabled: { control: "boolean" },
    isVisible: { control: "boolean" },
    idColumn: { control: "text" },
    parentIdColumn: { control: "text" },
  },
  args: {
    isDisabled: false,
    isVisible: true,
    idColumn: "ID",
    parentIdColumn: "Head_ID",
  },
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      container.style.height = "480px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

const renderGenerator = () => {
  let container: HTMLDivElement;
  let mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGeneratorReact(Component, {
        Images: DataSetMock,
      });

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._SetCanvasItems({});

      mockGenerator.context._parameters.Images._InitItems([
        {
          ImageContent: image1,
          ImageName: "Image 1",
        },
        {
          ImageContent: image2,
          ImageName: "Image 2",
        },
        {
          ImageContent: image3,
          ImageName: "Image 3",
        },
      ]);

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};

export const ImageSlide = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true } },
} as StoryObj<StoryArgs>;
