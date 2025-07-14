"use client";
import { Checkbox, CheckboxSize } from "blend-v1";
import React, { useState } from "react";
import ComponentPreview from "./ComponentPreview";

const CheckboxPreview = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [checked11, setChecked11] = useState(false);
  const [checked12, setChecked12] = useState(false);
  const [checked13, setChecked13] = useState(false);
  const [checked14, setChecked14] = useState(false);
  const [checked15, setChecked15] = useState(false);
  const [checked16, setChecked16] = useState(false);
  const [checked17, setChecked17] = useState(false);
  const [checked18, setChecked18] = useState(false);
  const [checked19, setChecked19] = useState(false);
  const [checked20, setChecked20] = useState(false);
  const [checked21, setChecked21] = useState(false);
  const [checked22, setChecked22] = useState(false);
  const [checked23, setChecked23] = useState(false);
  const [checked24, setChecked24] = useState(false);
  const [checked25, setChecked25] = useState(false);
  const [checked26, setChecked26] = useState(false);
  const [checked27, setChecked27] = useState(false);
  const [checked28, setChecked28] = useState(false);
  const [checked29, setChecked29] = useState(false);
  const [checked30, setChecked30] = useState(false);
  const [checked31, setChecked31] = useState(false);
  const [checked32, setChecked32] = useState(false);
  const [checked33, setChecked33] = useState(false);
  const [checked34, setChecked34] = useState(false);
  const [checked35, setChecked35] = useState(false);
  const [checked36, setChecked36] = useState(false);
  const [checked37, setChecked37] = useState(false);
  const [checked38, setChecked38] = useState(false);
  const [checked39, setChecked39] = useState(false);
  const [checked40, setChecked40] = useState(false);
  const [checked41, setChecked41] = useState(false);
  const [checked42, setChecked42] = useState(false);
  const [checked43, setChecked43] = useState(false);
  const [checked44, setChecked44] = useState(false);
  const [checked45, setChecked45] = useState(false);
  const [checked46, setChecked46] = useState(false);
  const [checked47, setChecked47] = useState(false);
  const [checked48, setChecked48] = useState(false);
  const [checked49, setChecked49] = useState(false);
  const [checked50, setChecked50] = useState(false);
  const [checked51, setChecked51] = useState(false);
  const [checked52, setChecked52] = useState(false);
  const [checked53, setChecked53] = useState(false);
  const [checked54, setChecked54] = useState(false);
  const [checked55, setChecked55] = useState(false);
  const [checked56, setChecked56] = useState(false);
  const [checked57, setChecked57] = useState(false);
  const [checked58, setChecked58] = useState(false);
  const [checked59, setChecked59] = useState(false);
  const [checked60, setChecked60] = useState(false);
  const [checked61, setChecked61] = useState(false);
  const [checked62, setChecked62] = useState(false);
  const [checked63, setChecked63] = useState(false);
  const [checked64, setChecked64] = useState(false);
  const [checked65, setChecked65] = useState(false);
  const [checked66, setChecked66] = useState(false);
  const [checked67, setChecked67] = useState(false);
  const [checked68, setChecked68] = useState(false);
  const [checked69, setChecked69] = useState(false);
  const [checked70, setChecked70] = useState(false);
  const [checked71, setChecked71] = useState(false);
  const [checked72, setChecked72] = useState(false);
  const [checked73, setChecked73] = useState(false);
  const [checked74, setChecked74] = useState(false);
  const [checked75, setChecked75] = useState(false);
  const [checked76, setChecked76] = useState(false);
  const [checked77, setChecked77] = useState(false);
  const [checked78, setChecked78] = useState(false);
  const [checked79, setChecked79] = useState(false);
  const [checked80, setChecked80] = useState(false);
  const [checked81, setChecked81] = useState(false);
  const [checked82, setChecked82] = useState(false);
  const [checked83, setChecked83] = useState(false);
  const [checked84, setChecked84] = useState(false);
  const [checked85, setChecked85] = useState(false);
  const [checked86, setChecked86] = useState(false);
  const [checked87, setChecked87] = useState(false);
  const [checked88, setChecked88] = useState(false);
  const [checked89, setChecked89] = useState(false);
  const [checked90, setChecked90] = useState(false);
  const [checked91, setChecked91] = useState(false);
  const [checked92, setChecked92] = useState(false);
  const [checked93, setChecked93] = useState(false);
  const [checked94, setChecked94] = useState(false);
  const [checked95, setChecked95] = useState(false);
  const [checked96, setChecked96] = useState(false);
  const [checked97, setChecked97] = useState(false);
  const [checked98, setChecked98] = useState(false);
  const [checked99, setChecked99] = useState(false);
  const [checked100, setChecked100] = useState(false);

  const tsCode = `import { Checkbox, CheckboxSize } from "blend-v1";

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      size={CheckboxSize.MEDIUM}
      required={true}
    >
      Accept terms and conditions
    </Checkbox>
  );
}`;

  const reCode = `type checkboxSize = [#sm | #md]

@react.component
let make = (
  ~id: option<string>=?,
  ~value: option<string>=?,
  ~checked: option<bool>=?,
  ~defaultChecked: option<bool>=?,
  ~onCheckedChange: option<bool => unit>=?,
  ~disabled: option<bool>=?,
  ~required: option<bool>=?,
  ~error: option<bool>=?,
  ~size: option<checkboxSize>=?,
  ~children: option<React.element>=?,
  ~subtext: option<string>=?,
  ~slot: option<React.element>=?,
) => {
  <CheckboxBinding
    ?id
    ?value
    ?checked
    ?defaultChecked
    ?onCheckedChange
    ?disabled
    ?required
    ?error
    ?size
    ?children
    ?subtext
    ?slot
  />
}`;

  const bindingCode = `@module("blend-v1") @react.component
external make: (
  ~id: string=?,
  ~value: string=?,
  ~checked: bool=?,
  ~defaultChecked: bool=?,
  ~onCheckedChange: bool => unit=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~error: bool=?,
  ~size: [#sm | #md]=?,
  ~children: React.element=?,
  ~subtext: string=?,
  ~slot: React.element=?,
) => React.element = "Checkbox"`;

  return (
    <ComponentPreview
      ts={tsCode}
      rescript={reCode}
      rescriptBinding={bindingCode}
    >
      <div className="m-4 min-w-100 space-y-8">
        {/* Basic Checkboxes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Checkboxes</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked1}
              onCheckedChange={setChecked1}
            >
              Basic checkbox
            </Checkbox>
            
            <Checkbox
              checked={checked2}
              onCheckedChange={setChecked2}
              size={CheckboxSize.SMALL}
            >
              Small checkbox
            </Checkbox>
            
            <Checkbox
              checked={checked3}
              onCheckedChange={setChecked3}
              required={true}
            >
              Required checkbox
            </Checkbox>
          </div>
        </div>

        {/* Checkbox States */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox States</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked4}
              onCheckedChange={setChecked4}
            >
              Unchecked state
            </Checkbox>
            
            <Checkbox
              checked={checked5}
              onCheckedChange={setChecked5}
            >
              Checked state
            </Checkbox>
            
            <Checkbox
              checked="indeterminate"
              onCheckedChange={(checked) => setChecked6(checked === true)}
            >
              Indeterminate state
            </Checkbox>
            
            <Checkbox
              checked={checked7}
              onCheckedChange={setChecked7}
              disabled={true}
            >
              Disabled checkbox
            </Checkbox>
            
            <Checkbox
              checked={checked8}
              onCheckedChange={setChecked8}
              error={true}
            >
              Error state
            </Checkbox>
          </div>
        </div>

        {/* Checkbox with Subtext */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox with Subtext</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked9}
              onCheckedChange={setChecked9}
              subtext="Additional information about this option"
            >
              Option with description
            </Checkbox>
            
            <Checkbox
              checked={checked10}
              onCheckedChange={setChecked10}
              subtext="This option is required for the form to be valid"
              required={true}
            >
              Required option with description
            </Checkbox>
            
            <Checkbox
              checked={checked11}
              onCheckedChange={setChecked11}
              subtext="This option is currently unavailable"
              disabled={true}
            >
              Disabled option with description
            </Checkbox>
          </div>
        </div>

        {/* Checkbox with Slot */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox with Slot</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked12}
              onCheckedChange={setChecked12}
              slot={<span className="text-blue-500 text-sm">New</span>}
            >
              Option with badge
            </Checkbox>
            
            <Checkbox
              checked={checked13}
              onCheckedChange={setChecked13}
              slot={<span className="text-green-500 text-sm">✓</span>}
            >
              Option with icon
            </Checkbox>
            
            <Checkbox
              checked={checked14}
              onCheckedChange={setChecked14}
              slot={<span className="text-orange-500 text-sm">Pro</span>}
              subtext="Premium feature available"
            >
              Premium option
            </Checkbox>
          </div>
        </div>

        {/* Checkbox Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox Sizes</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked15}
              onCheckedChange={setChecked15}
              size={CheckboxSize.SMALL}
            >
              Small checkbox
            </Checkbox>
            
            <Checkbox
              checked={checked16}
              onCheckedChange={setChecked16}
              size={CheckboxSize.MEDIUM}
            >
              Medium checkbox (default)
            </Checkbox>
          </div>
        </div>

        {/* Controlled vs Uncontrolled */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Controlled vs Uncontrolled</h3>
          <div className="space-y-4">
            <Checkbox
              checked={checked17}
              onCheckedChange={setChecked17}
            >
              Controlled checkbox
            </Checkbox>
            
            <Checkbox
              defaultChecked={true}
            >
              Uncontrolled checkbox (default checked)
            </Checkbox>
          </div>
        </div>

        {/* Form Example */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Form Example</h3>
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Notification Preferences</h4>
            
            <Checkbox
              checked={checked18}
              onCheckedChange={setChecked18}
            >
              Email notifications
            </Checkbox>
            
            <Checkbox
              checked={checked19}
              onCheckedChange={setChecked19}
              subtext="Receive updates about new features and improvements"
            >
              Product updates
            </Checkbox>
            
            <Checkbox
              checked={checked20}
              onCheckedChange={setChecked20}
              subtext="Get notified about security updates and important announcements"
              required={true}
            >
              Security alerts
            </Checkbox>
            
            <Checkbox
              checked={checked21}
              onCheckedChange={setChecked21}
              slot={<span className="text-blue-500 text-sm">Beta</span>}
              subtext="Try out new features before they're released"
            >
              Beta features
            </Checkbox>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
};

export default CheckboxPreview; 