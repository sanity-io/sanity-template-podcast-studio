import React, { Fragment } from "react";
import DefaultLabel from 'part:@sanity/components/labels/default'
import { FormBuilderInput } from "part:@sanity/form-builder";

import Player from './Player'

const WrappedDefaultInput = props => {
    const { type = {}, value } = props;
    // remove inputComponent property to prevent infinite loop caused by
    // FormBuilderInput resolving to WrappedDefaultInput again and again.
    const { inputComponent, ...restOfType } = type;
    const updatedProps = {
      ...props,
      type: restOfType,
    };

    return (
      <Fragment>
        {
          value &&
          <><DefaultLabel>Preview</DefaultLabel><Player {...value} /></>
        }
        <FormBuilderInput {...updatedProps} />
      </Fragment>
    );
}

export default WrappedDefaultInput
