"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LangContext";
import Loading from "@/app/loading";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Edit,
  Camera,
  Users,
  Award,
  Calendar,
  DollarSign,
  MessageCircle,
} from "lucide-react";

export default function ProfileComponent() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user, loading } = useAuth();
  const { messages } = useLang();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        try {
          const userDocRef = doc(db, "lists", user.email);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    if (!loading && !user.email) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (!userData)
    return (
      <>
        <Loading />
      </>
    );

  const getTypeIcon = (type) => {
    switch (type) {
      case "caregiver":
        return "\u{1F468}\u{200D}\u{2695}\u{FE0F}";
      case "nurse":
        return "\u{1F469}\u{200D}\u{2695}\u{FE0F}";
      case "careHome":
        return "\u{1F3E0}";
      case "transport":
        return "\u{1F691}";
      case "store":
        return "\u{1F6D2}";
      case "volunteer":
        return "\u{1F91D}";
      case "institution":
        return "\u{1F3DB}";
      default:
        return "\u{1F464}";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "caregiver":
        return messages["caregiverTitle"];
      case "nurse":
        return messages["nurseTitle"];
      case "careHome":
        return messages["carehomeTitle"];
      case "transport":
        return messages["transportTitle"];
      case "store":
        return messages["seniorstoreTitle"];
      case "volunteer":
        return messages["volunteerTitle"];
      case "institution":
        return messages["institutionTitle"];
      default:
        return "Profile";
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="overflow-hidden shadow-xl rounded-2xl border border-gray-200">
          {/* Banner Section */}
          <div className="relative h-40 bg-gradient-to-r from-[#206645] to-[#2d8a5f]">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Content */}
          <CardContent className="relative -mt-20 pt-0 pb-6 px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="w-36 h-36 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={userData.photos?.[0] || "/placeholder.svg"}
                    alt={userData.name}
                  />
                  <AvatarFallback className="text-3xl bg-[#206645] text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-9 h-9 p-0 bg-[#206645] hover:bg-[#185536]"
                >
                  <Camera className="w-4 h-4 text-white" />
                </Button>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-4 mt-4 md:mt-0">
                <div className="flex items-center justify-between flex-wrap">
                  <div>
                    <h1 className="text-4xl font-extrabold text-white mb-1">
                      {userData.name}
                    </h1>
                    <Badge className="bg-[#206645]/10 text-white border border-[#206645]/20 text-base px-3 py-1">
                      <span className="mr-1">
                        {getTypeIcon(userData.entryType)}
                      </span>
                      {getTypeLabel(userData.entryType)}
                    </Badge>
                  </div>
                  <Button
                    size="lg"
                    className="bg-[#206645] text-white hover:bg-[#185536] font-semibold shadow-md mt-4 md:mt-0"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    {messages["editprofileTitle"]}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-base text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {userData.address}, {userData.city}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    {userData.email}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex">{renderStars(5)}</div>
                  <span className="text-base text-gray-700 font-medium">
                    5.0 ({userData.reviews?.length || 0}{" "}
                    {messages["reviewsTitle"]})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional cards (About, Professional Details, Reviews, etc.) go here as in previous code */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#206645]" />
                  {messages["descriptionTitle"]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {userData.description}
                </p>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#206645]" />
                  {messages["professionaldetailsTitle"]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold">
                        {userData.caregiver.experience} years
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Hourly Rate</p>
                      <p className="font-semibold">
                        ${userData.caregiver.hourlyRate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Availability</p>
                      <p className="font-semibold">
                        {userData.caregiver.availability}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <a
                        href={userData.caregiver.telegram}
                        className="font-semibold text-[#206645] hover:underline"
                      >
                        Telegram
                      </a>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-600 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.caregiver.specializations.map((spec, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[#206645]/30 text-[#206645]"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Certifications</p>
                  <p className="font-medium">
                    {userData.caregiver.certifications}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#206645]" />
                  {messages["photogalleryTitle"]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main Photo */}
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={
                        userData.photos[activePhotoIndex] || "/placeholder.svg"
                      }
                      alt="Profile photo"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-2">
                    {userData.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                          activePhotoIndex === index
                            ? "border-[#206645]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{messages["quickactionsTitle"]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#206645] hover:bg-[#185536]">
                  <Phone className="w-4 h-4 mr-2" />
                  {messages["callnowTitle"]}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#206645] text-[#206645] hover:bg-[#206645]/10"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {messages["sendmessageTitle"]}
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {messages["contactviatelegramTitle"]}
                </Button>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#206645]" />
                  {messages["clientreviewsLabel"]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.reviews.map((review, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.phone}</p>
                      </div>
                      <div className="flex">{renderStars(5)}</div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      &quot;{review.text}&quot;
                    </p>
                    {index < userData.reviews.length - 1 && <Separator />}
                  </div>
                ))}

                <Button
                  variant="ghost"
                  className="w-full text-[#206645] hover:bg-[#206645]/10"
                >
                  {messages["viewallreviewsTitle"]}
                </Button>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>{messages["verificationstatusTitle"]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {messages["identityverifiedTitle"]}
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    ✓ {messages["verifiedTitle"]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
