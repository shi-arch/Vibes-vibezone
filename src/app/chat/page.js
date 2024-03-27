"use client"
import Chat from '../../components/chat'
import SideBar from "../../components/SideBar/sideBar";
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import PricingPlansModal from "../../components/Modals/PricingPlansModal";
import { useSelector } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";

function ChatPage() {
    return (
      <div>
        <Chat />
        <BadgesModal />
        <ProfileModal />
        <BillingModal />
        <PrivacyPolicyModal />
        <NotificationModal />
        <PreferenceModal />
        <ProfileModal />
      </div>
    );
}

export default ChatPage

