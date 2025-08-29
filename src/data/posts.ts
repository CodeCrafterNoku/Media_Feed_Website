export type Post = {
 id: string;
 title: string;
 supplier: string;
 amountZar: number;
 thumbnailUrl: string;
 imageUrl: string;
 dueAt?: string; // ISO datetime; if within 24h, show "Remind me"
};
export const ALL_POSTS: Post[] = [
 {
 id: "1",
 title: "Cloud Services Retainer",
 supplier: "Thrive Business Solutions",
 amountZar: 12500.5,
 thumbnailUrl: "https://picsum.photos/id/1015/200/120",
 imageUrl: "https://picsum.photos/id/1015/1200/720",
 dueAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() // +2h
 },
 {
 id: "2",
 title: "Recruitment Fees",
 supplier: "Connect HR",
 amountZar: 8900,
 thumbnailUrl: "https://picsum.photos/id/1025/200/120",
 imageUrl: "https://picsum.photos/id/1025/1200/720",
dueAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString() // +26h (no button)
 },
 {
 id: "3",
 title: "Engineering Bootcamp",
 supplier: "Dev Science",
 amountZar: 15200,
 thumbnailUrl: "https://picsum.photos/id/1035/200/120",
 imageUrl: "https://picsum.photos/id/1035/1200/720"
 },
 // …duplicate a few variations up to ~30 items with mixed dueAt values
 {
    id: "4",
    title: "Marketing Campaign",
    supplier: "BrandVision",
    amountZar: 7800,
    thumbnailUrl: "https://picsum.photos/id/1045/200/120",
    imageUrl: "https://picsum.photos/id/1045/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString() // +10h
  },
  {
    id: "5",
    title: "Software License Renewal",
    supplier: "TechWare",
    amountZar: 4300,
    thumbnailUrl: "https://picsum.photos/id/1055/200/120",
    imageUrl: "https://picsum.photos/id/1055/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 30).toISOString() // +30h
  },
  {
    id: "6",
    title: "Cloud Storage Upgrade",
    supplier: "DataHub",
    amountZar: 6200,
    thumbnailUrl: "https://picsum.photos/id/1065/200/120",
    imageUrl: "https://picsum.photos/id/1065/1200/720"
  },
  {
    id: "7",
    title: "Office Supplies",
    supplier: "Stationery Co.",
    amountZar: 1450,
    thumbnailUrl: "https://picsum.photos/id/1075/200/120",
    imageUrl: "https://picsum.photos/id/1075/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString() // +20h
  }, 
  {
  id: "8",
  title: "Website Redesign",
  supplier: "Creative Labs",
  amountZar: 11200,
  thumbnailUrl: "https://fastly.picsum.photos/id/5/200/120.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc",
  imageUrl: "https://fastly.picsum.photos/id/5/5000/3334.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc",
  dueAt: new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString() // +40h
  },

 {
  id: "9",
  title: "App Subscription",
  supplier: "Softly",
  amountZar: 950,
  thumbnailUrl: "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA&w=200&h=120", // resized for thumbnail
  imageUrl: "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA", // full image
  dueAt: new Date(Date.now() + 1000 * 60 * 30).toISOString() // +30m
},
  {
    id: "10",
    title: "HR Workshop",
    supplier: "PeopleFirst",
    amountZar: 7200,
    thumbnailUrl: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
    imageUrl: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g"
  },
  // remaining items
  {
    id: "11",
    title: "Financial Audit",
    supplier: "MoneyMatters",
    amountZar: 15800,
    thumbnailUrl: "https://fastly.picsum.photos/id/116/3504/2336.jpg?hmac=C46vgpj3R407e8pCyy8NhIsNaBZCjb4r5d71keNgMJY",
    imageUrl: "https://fastly.picsum.photos/id/116/3504/2336.jpg?hmac=C46vgpj3R407e8pCyy8NhIsNaBZCjb4r5d71keNgMJY",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString() // +6h
  },
  {
    id: "12",
    title: "Training Program",
    supplier: "SkillUp",
    amountZar: 8400,
    thumbnailUrl: "https://fastly.picsum.photos/id/145/4288/2848.jpg?hmac=UkhcwQUE-vRBFXzDN1trCwWigpm7MXG5Bl5Ji103QG4",
    imageUrl: "https://fastly.picsum.photos/id/145/4288/2848.jpg?hmac=UkhcwQUE-vRBFXzDN1trCwWigpm7MXG5Bl5Ji103QG4",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 50).toISOString() // +50h
  },
  {
    id: "13",
    title: "Legal Consultation",
    supplier: "LawPoint",
    amountZar: 6700,
    thumbnailUrl: "https://fastly.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8",
    imageUrl: "https://fastly.picsum.photos/id/1135/1200/720.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8",
     dueAt: new Date(Date.now() + 1000 * 60 * 60 * 15).toISOString() // +15h
  },
  {
    id: "14",
    title: "Networking Event",
    supplier: "BizConnect",
    amountZar: 3200,
    thumbnailUrl: "https://fastly.picsum.photos/id/201/5000/3333.jpg?hmac=NE8fOMa8u9PBfkq4AVwEoJdRqoPTNwUsyKvKWuXyNCk",
    imageUrl: "https://fastly.picsum.photos/id/201/5000/3333.jpg?hmac=NE8fOMa8u9PBfkq4AVwEoJdRqoPTNwUsyKvKWuXyNCk",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 15).toISOString() // +15h
  },
  {
    id: "15",
    title: "Content Creation",
    supplier: "MediaWorks",
    amountZar: 4100,
    thumbnailUrl: "https://fastly.picsum.photos/id/258/4608/3072.jpg?hmac=9JDdAUW9UW7NRF3l4D2IOVQ76bw1hMxcnoLdQvwLxjA",
    imageUrl: "https://fastly.picsum.photos/id/258/4608/3072.jpg?hmac=9JDdAUW9UW7NRF3l4D2IOVQ76bw1hMxcnoLdQvwLxjA"
  },
  {
    id: "16",
    title: "Server Maintenance",
    supplier: "TechCare",
    amountZar: 5300,
    thumbnailUrl: "https://fastly.picsum.photos/id/299/5000/3288.jpg?hmac=vajPmKo1hPW0RLYeb2h14Ry9Mp5Gw0rs0yc78FmBmdM",
    imageUrl: "https://fastly.picsum.photos/id/299/5000/3288.jpg?hmac=vajPmKo1hPW0RLYeb2h14Ry9Mp5Gw0rs0yc78FmBmdM",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString() // +3h
  },
  {
    id: "17",
    title: "SEO Optimization",
    supplier: "RankHigh",
    amountZar: 6700,
    thumbnailUrl: "https://fastly.picsum.photos/id/341/5000/3337.jpg?hmac=au9Ex3OCaHWkfF3Ttoe4sXkQOsGPGeA1vrRwhmB2aug",
    imageUrl: "https://fastly.picsum.photos/id/341/5000/3337.jpg?hmac=au9Ex3OCaHWkfF3Ttoe4sXkQOsGPGeA1vrRwhmB2aug"
  },
  {
    id: "18",
    title: "Product Photoshoot",
    supplier: "PixelPerfect",
    amountZar: 8900,
    thumbnailUrl: "https://fastly.picsum.photos/id/405/3000/1688.jpg?hmac=wihswILm48QrPF9GurD8QtSqMDtOY28jEWZPvlwderk",
    imageUrl: "https://fastly.picsum.photos/id/1185/1200/720.jpg?hmac=wihswILm48QrPF9GurD8QtSqMDtOY28jEWZPvlwderk",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString() // +8h
  },
  {
    id: "19",
    title: "Social Media Ads",
    supplier: "AdWise",
    amountZar: 4700,
    thumbnailUrl: "https://fastly.picsum.photos/id/454/4403/2476.jpg?hmac=pubXcBaPumNk0jElL63xrQYiSwQWA_DtS8uNNV8PmIE",
    imageUrl: "https://fastly.picsum.photos/id/1195/1200/720.jpg?hmac=pubXcBaPumNk0jElL63xrQYiSwQWA_DtS8uNNV8PmIE"
  },
  {
    id: "20",
    title: "Client Workshop",
    supplier: "BizHub",
    amountZar: 7800,
    thumbnailUrl: "https://fastly.picsum.photos/id/670/2048/1367.jpg?hmac=GT5_zCn_mHuBQWHO0b987AQsuWB_VLmKQJXydYPnSHc",
    imageUrl: "https://fastly.picsum.photos/id/670/2048/1367.jpg?hmac=GT5_zCn_mHuBQWHO0b987AQsuWB_VLmKQJXydYPnSHc",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString() // +12h
  },
  {
    id: "21",
    title: "Email Campaign",
    supplier: "MailWorks",
    amountZar: 3100,
    thumbnailUrl: "https://fastly.picsum.photos/id/764/3264/2448.jpg?hmac=snx50ESWmVMawAixDRfTW0Ms4bPaKBfmboTgX3Y088s",
    imageUrl: "https://fastly.picsum.photos/id/1215/1200/720.jpg?hmac=snx50ESWmVMawAixDRfTW0Ms4bPaKBfmboTgX3Y088s"
  },
  {
    id: "22",
    title: "Mobile App Testing",
    supplier: "AppTesters",
    amountZar: 9200,
    thumbnailUrl: "https://fastly.picsum.photos/id/828/3165/2374.jpg?hmac=P07EiUQGzH3TNY0b3bNi4oWgETndZUmMaiJ8CL6EO8M",
    imageUrl: "https://fastly.picsum.photos/id/828/3165/2374.jpg?hmac=P07EiUQGzH3TNY0b3bNi4oWgETndZUmMaiJ8CL6EO8M",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString() // +5h
  },
  {
    id: "23",
    title: "Graphic Design",
    supplier: "DesignStudio",
    amountZar: 4300,
    thumbnailUrl: "https://fastly.picsum.photos/id/871/5000/3338.jpg?hmac=0cbFAJ55kp9mwznL2aX6NTWQp1VXOICQq-kaivG-Q_A",
    imageUrl: "https://fastly.picsum.photos/id/871/5000/3338.jpg?hmac=0cbFAJ55kp9mwznL2aX6NTWQp1VXOICQq-kaivG-Q_A"
  },
  {
    id: "24",
    title: "IT Support",
    supplier: "HelpDesk Pro",
    amountZar: 6100,
    thumbnailUrl: "https://fastly.picsum.photos/id/882/4896/3264.jpg?hmac=k8TP78rWgv5867y7lPCEWOqAjl55VFLs6Uspgi40_ak",
    imageUrl: "https://fastly.picsum.photos/id/1245/1200/720.jpg?hmac=k8TP78rWgv5867y7lPCEWOqAjl55VFLs6Uspgi40_ak",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString() // +18h
  },
  {
    id: "25",
    title: "Online Course",
    supplier: "LearnOnline",
    amountZar: 2700,
    thumbnailUrl: "https://fastly.picsum.photos/id/885/4000/2667.jpg?hmac=IrjRbqugGjfrXfEv6t65cpdv8j6EFpGT7ZOJipcgHJc",
    imageUrl: "https://fastly.picsum.photos/id/1255/1200/720.jpg?hmac=IrjRbqugGjfrXfEv6t65cpdv8j6EFpGT7ZOJipcgHJc"
  },
  {
    id: "26",
    title: "Database Upgrade",
    supplier: "DataPros",
    amountZar: 10800,
    thumbnailUrl: "https://fastly.picsum.photos/id/938/5000/3324.jpg?hmac=JMj_dDbq183Q0kYmOLG_s6aORXXhKMXZQ63V0_0q6D8",
    imageUrl: "https://fastly.picsum.photos/id/938/5000/3324.jpg?hmac=JMj_dDbq183Q0kYmOLG_s6aORXXhKMXZQ63V0_0q6D8",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString() // +4h
  },
  {
    id: "27",
    title: "Networking Setup",
    supplier: "NetConnect",
    amountZar: 5400,
    thumbnailUrl: "https://fastly.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q",
    imageUrl: "https://fastly.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q"
  },
  {
    id: "28",
    title: "Cloud Backup",
    supplier: "SecureCloud",
    amountZar: 6700,
    thumbnailUrl: "https://fastly.picsum.photos/id/1036/4608/3072.jpg?hmac=Tn9CS_V7lFSMMgAI5k1M38Mdj-YEJR9dPJCyeXNpnZc",
    imageUrl: "https://fastly.picsum.photos/id/1036/4608/3072.jpg?hmac=Tn9CS_V7lFSMMgAI5k1M38Mdj-YEJR9dPJCyeXNpnZc",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString() // +22h
  },
  {
    id: "29",
    title: "Security Audit",
    supplier: "SafeNet",
    amountZar: 9400,
    thumbnailUrl: "https://fastly.picsum.photos/id/1043/5000/3333.jpg?hmac=X-TXF9P4ZEfcVvW2w17dtrXQLkTNl5UhX0TKF48S9XQ",
    imageUrl: "https://fastly.picsum.photos/id/1043/5000/3333.jpg?hmac=X-TXF9P4ZEfcVvW2w17dtrXQLkTNl5UhX0TKF48S9XQ"
  },
  {
    id: "30",
    title: "Team Retreat",
    supplier: "WorkCulture",
    amountZar: 15000,
    thumbnailUrl: "https://fastly.picsum.photos/id/1071/3000/1996.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ",
    imageUrl: "https://fastly.picsum.photos/id/1305/1200/720.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString() // +1h
  }
];
