import { useState } from "react";
import ButtonDemo from "./ButtonDemo";
import { Grid, IndianRupee, Square, TagIcon, UserIcon } from "lucide-react";
import { FOUNDATION_THEME, Sidebar } from "blend-v1";
import ButtonGroupDemo from "./ButtonGroupDemo";
import TagDemo from "./TagDemo";

const SidebarDemo = () => {
  const [activeComponent, setActiveComponent] = useState<
    | "buttons"
    | "tooltips"
    | "tags"
    | "splitTags"
    | "breadcrumb"
    | "tabs"
    | "checkbox"
    | "radio"
    | "switch"
    | "textInput"
    | "alerts"
    | "avatarGroup"
    | "charts"
    | "chartsV2"
    | "fonts"
    | "datePicker"
    | "selectors"
    | "buttonGroups"
    | "avatars"
    | "menu"
    | "dropdown"
    | "accordion"
    | "statCard"
    | "modal"
    | "input"
    | "snackbar"
    | "dataTable"
    | "colorPalette"
    | "popover"
    | "theme"
    | "salesKpiDashboard"
    | "transactionAnalyticsDashboard"
  >("tags");

  const [activeTenant, setActiveTenant] = useState<string>("Juspay");
  const [activeMerchant, setActiveMerchant] = useState<string | undefined>(
    "Design System",
  );

  const tenants = [
    {
      label: "Juspay",
      icon: (
        <IndianRupee
          style={{ width: "16px", height: "16px" }}
          color={FOUNDATION_THEME.colors.gray[600]}
        />
      ),
      id: "juspay",
    },
    {
      label: "Razorpay",
      icon: (
        <UserIcon
          style={{ width: "16px", height: "16px" }}
          color={FOUNDATION_THEME.colors.gray[600]}
        />
      ),
      id: "razorpay",
    },
  ];

  const merchants = [
    {
      label: "Design System",
      icon: <UserIcon style={{ width: "16px", height: "16px" }} />,
      id: "design-system",
    },
    {
      label: "Design System 2",
      icon: <UserIcon style={{ width: "16px", height: "16px" }} />,
      id: "design-system-2",
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case "buttons":
        return <ButtonDemo />;
      case "buttonGroups":
        return <ButtonGroupDemo />;
      case "tags":
        return <TagDemo />;
      default:
        return <div>No component selected</div>;
    }
  };

  const sampleData = [
    {
      label: "Basic Components",
      items: [
        {
          label: "Button",
          leftSlot: <Square style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("buttons"),
        },
        {
          label: "Button Group",
          leftSlot: <Grid style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("buttonGroups"),
        },
        {
          label: "Tag",
          leftSlot: <TagIcon style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("tags"),
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen">
      <Sidebar
        activeTenant={activeTenant}
        setActiveTenant={setActiveTenant}
        tenants={tenants}
        activeMerchant={activeMerchant}
        setActiveMerchant={setActiveMerchant}
        merchants={merchants}
        data={sampleData}
        topbar={<div>Topbar</div>}
      >
        <div className="w-full h-full">{renderContent()}</div>
      </Sidebar>
    </div>
  );
};

export default SidebarDemo;
