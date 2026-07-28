"use client";

import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export interface InputOTPProps extends Omit<BaseOTPField.Root.Props, "className" | "render"> {
  className?: string;
  /**
   * How many slots sit between separators. Defaults to no grouping — one unbroken run.
   *
   * A code is easier to read and to check against the message that delivered it when it is
   * chunked the way it was sent, so a six-digit code usually wants `3`.
   */
  groupSize?: number;
}

/**
 * The one-time-code field.
 *
 * Each slot is a real input rather than a box painted over one hidden field, so focus, paste and
 * the software keyboard all behave natively — pasting a whole code fills the run.
 */
export function InputOTP({ className, groupSize, length, ...props }: InputOTPProps): ReactElement {
  const size = groupSize === undefined || groupSize <= 0 ? length : groupSize;
  const groups: number[][] = [];

  for (let start = 0; start < length; start += size) {
    groups.push(Array.from({ length: Math.min(size, length - start) }, (_, at) => start + at));
  }

  return (
    <BaseOTPField.Root
      className={classes("input-otp", className)}
      data-slot="input-otp"
      length={length}
      {...props}
    >
      {groups.map((indexes, group) => (
        <div className="input-otp__run" key={indexes[0]}>
          {group === 0 ? null : (
            <span
              aria-hidden="true"
              className="input-otp__separator"
              data-slot="input-otp-separator"
            />
          )}
          <div className="input-otp__group" data-slot="input-otp-group">
            {indexes.map((index) => (
              <BaseOTPField.Input
                className="input-otp__slot"
                data-slot="input-otp-slot"
                key={index}
              />
            ))}
          </div>
        </div>
      ))}
    </BaseOTPField.Root>
  );
}
