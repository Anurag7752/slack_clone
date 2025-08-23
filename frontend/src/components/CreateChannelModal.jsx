import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useChatContext } from "stream-chat-react";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import {
  AlertCircleIcon,
  HashIcon,
  LockIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

const CreateChannelModal = ({ onclose }) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("public");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  const { client, setActiveChannel } = useChatContext();

  //fetch users for the selection
  useEffect(() => {
    const fetchUsers = async () => {
      if (!client?.user) return;
      setLoadingUsers(true);
      try {
        const response = await client.queryUser(
          { id: { $ne: client.user.id } },
          { name: 1 },
          { limit: 100 }
        );

        const usersOnly = response.filter(
          (user) => !user.id.startsWith("recording")
        );

        setUsers(usersOnly || []);
      } catch (error) {
        console.log("Error fetching users");
        Sentry.captureException(error, {
          tags: { component: "CreateChannelModal" },
          extra: { context: "fetch_users_for_channel" },
        });
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [client]);

  // reset the form on open: this is not needed, we just deleted it later in the video
  // useEffect(() => {
  //   setChannelName("");
  //   setDescription("");
  //   setChannelType("public");
  //   setError("");
  //   setSelectedMembers([]);
  // }, []);

  // auto-select all users for public channels
  useEffect(() => {
    if (channelType === "public") {
      setSelectedMembers(users.map((user) => user.id));
    } else {
      setSelectedMembers([]);
    }
  }, [channelType, users]);

  const validateChannelName = (name) => {
    if (!name.trim()) return "Channel name is required";
    if (name.length < 3) return "Channel name must be at least 3 characters";
    if (name.length > 22) return "Channel name must be less than 22 characters";

    return "";
  };

  const handleChannelNameChange = (e) => {
    const value = e.target.value;
    setChannelName(value);
    setError(validateChannelName(value));
};

const handleMemberToggle = (userId) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((uid) => uid !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateChannelName(channelName);
    if(validationError) return setError(validationError);

    if(isCreating || !client.user) return;

    setIsCreating(true);
    setError("");

    try{
        // MY COOL CHANNEL !#1 => my-cool-channel-1
        
    }
}