"use client";

import { useDisplayFormToast } from "@/app/_hooks/useDisplayFormToast";
import {
  updateAvatarAction,
  updateDisplayNameAction,
} from "@/app/_lib/actions";
import { customErrorToast, customSuccessToast } from "@/app/_lib/helpers";
import { useActionState, useEffect } from "react";

function UpdateProfile() {
  const [displayNameState, displayNameFormAction, isUpdatingDisplayName] =
    useActionState(updateDisplayNameAction, null);

  const [avatarState, avatarAction, isUpdatingAvatar] = useActionState(
    updateAvatarAction,
    null
  );

  const { errors, inputs } = displayNameState ?? {};
  const { errors: avatarError, inputs: avatarInputs } = avatarState ?? {};

  useDisplayFormToast(displayNameState);
  useDisplayFormToast(avatarState);

  return (
    <div className="space-y-5">
      <h3>Update Profile</h3>
      <form action={displayNameFormAction} className="max-w-[350px]">
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="name">Update Display Name </label>
            {errors?.name?.at(0) && (
              <span className="error-msg">{errors?.name?.at(0)}</span>
            )}
          </div>

          <input
            type="text"
            name="name"
            disabled={isUpdatingDisplayName}
            defaultValue={inputs?.name}
            autoComplete="name"
            id="name"
            placeholder="Your Name"
          />
        </div>

        <button
          disabled={isUpdatingDisplayName}
          style={{ opacity: isUpdatingDisplayName && 0.8 }}
          className="btn btn-paid rounded-lg mt-4 mb-3"
        >
          {isUpdatingDisplayName ? "Updating..." : "Update Name"}
        </button>
      </form>

      {/* update avatar */}

      <form action={avatarAction} className="max-w-[350px]">
        <div className="field">
          <div className="label_and_error">
            <label htmlFor="avatar">Upload an avatar (optional) </label>
            {avatarError?.size?.at(0) && (
              <span className="error-msg">{avatarError?.size?.at(0)}</span>
            )}
          </div>

          <input
            type="file"
            name="avatar"
            id="avatar"
            defaultValue={avatarInputs}
            style={{
              color: "#888EB0",
              fontWeight: 400,
              border: "none",
              padding: 0,
            }}
            disabled={isUpdatingAvatar}
            accept="image/*"
            className="text-color-07 file:bg-color-01 file:text-white file:outline-none file:border-none file:py-2.5 file:px-6 file:rounded-md file:font-medium file:cursor-pointer file:ml-0 file:mr-8"
          />
        </div>

        <button
          disabled={isUpdatingAvatar}
          style={{ opacity: isUpdatingAvatar && 0.8 }}
          className="btn btn-paid rounded-lg mt-4 py-3 "
        >
          {isUpdatingAvatar ? "Updating..." : "Update Avatar"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
