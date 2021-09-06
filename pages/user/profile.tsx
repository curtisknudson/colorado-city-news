import React, { useState } from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar, UserInfo } from "@components/profile";
import { UserProfileContext } from "@providers/profile";
import { UserProfileInfo } from "@providers/profile/userProfileProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const mediator = useUserMediator();
  const [session, loading] = useSession();
  const [userProfileData, setUserProfileData] = useState<UserProfileInfo>({
    name: "",
    email: "",
    image: "",
  });

  const handleSave = async () => {
    if (
      userProfileData.name &&
      userProfileData.email &&
      userProfileData.image
    ) {
      const userProfile = async () => {
        let userProfile = await mediator
          .completeUserProfile(userProfileData)
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            return err;
          });
        return userProfile;
      };
      toast
        .promise(userProfile, {
          pending: "Please wait...",
          success: "Your account has been updated! 👌",
          error: "There was an error 🤯. Contact admin@coloradocity.news ",
        })
        .then((res) => res);
      return;
    }
    toast.warning(
      "Please make sure all of your data has been filled out. You must provide an image"
    );
    return;
  };

  return (
    <UserProfileContext.Provider value={[userProfileData, setUserProfileData]}>
      <Layout>
        {loading ? (
          <div>Loading please wait</div>
        ) : (
          <NeedsAuthentication>
            <Avatar />
            <UserInfo
              email={
                typeof session!.user!.email! === "string"
                  ? session!.user!.email
                  : "No Email Found"
              }
            />
            <div
              className="cursor-pointer border rounded w-14 center-all mx-auto mt-4"
              onClick={handleSave}
            >
              Save
            </div>
          </NeedsAuthentication>
        )}
      </Layout>
    </UserProfileContext.Provider>
  );
};

export default Profile;
