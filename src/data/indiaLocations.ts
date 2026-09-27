export interface IndiaState {
  code: string;
  name: string;
  type: 'State' | 'Union Territory';
  districts: string[];
  popularCities: string[];
}

export const INDIA_STATES_AND_UTS: IndiaState[] = [
  {
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    districts: ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
    popularCities: ['Port Blair', 'Diglipur', 'Mayabunder', 'Car Nicobar'],
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    type: 'State',
    districts: [
      'Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla',
      'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur',
      'Kakinada', 'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam',
      'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam',
      'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
    ],
    popularCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry', 'Kadapa', 'Anantapur'],
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    type: 'State',
    districts: [
      'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle',
      'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley',
      'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi',
      'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'
    ],
    popularCities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Tezu', 'Bomdila'],
  },
  {
    code: 'AS',
    name: 'Assam',
    type: 'State',
    districts: [
      'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
      'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat',
      'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong',
      'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari',
      'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
    ],
    popularCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon'],
  },
  {
    code: 'BR',
    name: 'Bihar',
    type: 'State',
    districts: [
      'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur',
      'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad',
      'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani',
      'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas',
      'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan',
      'Supaul', 'Vaishali', 'West Champaran'
    ],
    popularCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar'],
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    type: 'Union Territory',
    districts: ['Chandigarh'],
    popularCities: ['Chandigarh', 'Manimajra', 'Sector 17', 'Sector 35', 'Sector 43'],
  },
  {
    code: 'CG',
    name: 'Chhattisgarh',
    type: 'State',
    districts: [
      'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur',
      'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa',
      'Jashpur', 'Kabirdham', 'Kanker', 'Khairagarh-Chhuikhadan-Gandai', 'Kondagaon',
      'Korba', 'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki',
      'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh',
      'Sakti', 'Sukma', 'Surajpur', 'Surguja'
    ],
    popularCities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Durg', 'Ambikapur'],
  },
  {
    code: 'DH',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    districts: ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
    popularCities: ['Silvassa', 'Daman', 'Diu', 'Naroli', 'Dadra'],
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    type: 'Union Territory',
    districts: [
      'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi',
      'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'
    ],
    popularCities: ['New Delhi', 'Connaught Place', 'Dwarka', 'Rohini', 'Saket', 'Lajpat Nagar', 'Karol Bagh', 'Chandni Chowk', 'Vasant Kunj', 'Janakpuri', 'Mayur Vihar'],
  },
  {
    code: 'GA',
    name: 'Goa',
    type: 'State',
    districts: ['North Goa', 'South Goa'],
    popularCities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Calangute', 'Candolim', 'Bicholim'],
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    type: 'State',
    districts: [
      'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar',
      'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar',
      'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana',
      'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot',
      'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
    ],
    popularCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Navsari', 'Morbi'],
  },
  {
    code: 'HR',
    name: 'Haryana',
    type: 'State',
    districts: [
      'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram',
      'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh',
      'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'
    ],
    popularCities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    type: 'State',
    districts: [
      'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti',
      'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
    ],
    popularCities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Manali', 'Bilaspur', 'Baddi', 'Palampur', 'Chamba'],
  },
  {
    code: 'JK',
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    districts: [
      'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu',
      'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri',
      'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'
    ],
    popularCities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua', 'Sopore', 'Poonch', 'Rajouri'],
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    type: 'State',
    districts: [
      'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa',
      'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma',
      'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj',
      'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'
    ],
    popularCities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh'],
  },
  {
    code: 'KA',
    name: 'Karnataka',
    type: 'State',
    districts: [
      'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar',
      'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada',
      'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu',
      'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga',
      'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'
    ],
    popularCities: ['Bengaluru', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Davanagere', 'Ballari', 'Vijayapura', 'Shivamogga', 'Tumakuru', 'Udupi'],
  },
  {
    code: 'KL',
    name: 'Kerala',
    type: 'State',
    districts: [
      'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam',
      'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ],
    popularCities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Kannur', 'Alappuzha', 'Palakkad', 'Kottayam', 'Kasaragod'],
  },
  {
    code: 'LA',
    name: 'Ladakh',
    type: 'Union Territory',
    districts: ['Kargil', 'Leh'],
    popularCities: ['Leh', 'Kargil', 'Diskit', 'Nubra', 'Drass', 'Padum'],
  },
  {
    code: 'LD',
    name: 'Lakshadweep',
    type: 'Union Territory',
    districts: ['Lakshadweep'],
    popularCities: ['Kavaratti', 'Agatti', 'Amini', 'Andrott', 'Minicoy'],
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    type: 'State',
    districts: [
      'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul',
      'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia',
      'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore',
      'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena',
      'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa',
      'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri',
      'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'
    ],
    popularCities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Singrauli', 'Burhanpur'],
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    type: 'State',
    districts: [
      'Ahmednagar', 'Akola', 'Amravati', 'Chhatrapati Sambhajinagar', 'Beed', 'Bhandara',
      'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon',
      'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded',
      'Nandurbar', 'Nashik', 'Dharashiv', 'Palghar', 'Parbhani', 'Pune', 'Raigad',
      'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ],
    popularCities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar', 'Solapur', 'Navi Mumbai', 'Kolhapur', 'Amravati', 'Nanded', 'Sangli', 'Jalgaon'],
  },
  {
    code: 'MN',
    name: 'Manipur',
    type: 'State',
    districts: [
      'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam',
      'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong',
      'Tengnoupal', 'Thoubal', 'Ukhrul'
    ],
    popularCities: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul', 'Senapati'],
  },
  {
    code: 'ML',
    name: 'Meghalaya',
    type: 'State',
    districts: [
      'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills',
      'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills',
      'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'
    ],
    popularCities: ['Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Williamnagar', 'Cherrapunji', 'Mairang'],
  },
  {
    code: 'MZ',
    name: 'Mizoram',
    type: 'State',
    districts: [
      'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai',
      'Lunglei', 'Mamit', 'Saitual', 'Serchhip', 'Siaha'
    ],
    popularCities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Siaha'],
  },
  {
    code: 'NL',
    name: 'Nagaland',
    type: 'State',
    districts: [
      'Chumoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung',
      'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'
    ],
    popularCities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Mon'],
  },
  {
    code: 'OR',
    name: 'Odisha',
    type: 'State',
    districts: [
      'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack',
      'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur',
      'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha',
      'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
      'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
    ],
    popularCities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
  },
  {
    code: 'PY',
    name: 'Puducherry',
    type: 'Union Territory',
    districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
    popularCities: ['Puducherry', 'Karaikal', 'Oulgaret', 'Mahe', 'Yanam'],
  },
  {
    code: 'PB',
    name: 'Punjab',
    type: 'State',
    districts: [
      'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka',
      'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana',
      'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar',
      'Sahibzada Ajit Singh Nagar (Mohali)', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Tarn Taran'
    ],
    popularCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Hoshiarpur', 'Pathankot', 'Moga', 'Batala'],
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    type: 'State',
    districts: [
      'Ajmer', 'Alwar', 'Anupgarh', 'Balotra', 'Banswara', 'Baran', 'Barmer', 'Beawar',
      'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa',
      'Deeg', 'Didwana-Kuchaman', 'Dholpur', 'Dudu', 'Dungarpur', 'Ganganagar',
      'Gangapur City', 'Hanumangarh', 'Jaipur', 'Jaipur Rural', 'Jaisalmer', 'Jalore',
      'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Jodhpur Rural', 'Karauli', 'Kekri', 'Kota',
      'Kotputli-Behror', 'Nagaur', 'Neem Ka Thana', 'Pali', 'Phalodi', 'Pratapgarh',
      'Rajsamand', 'Salumbar', 'Sanchore', 'Sawai Madhopur', 'Shahpura', 'Sikar',
      'Sirohi', 'Tonk', 'Udaipur'
    ],
    popularCities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar'],
  },
  {
    code: 'SK',
    name: 'Sikkim',
    type: 'State',
    districts: ['Gangtok', 'Gyalshing', 'Mangan', 'Namchi', 'Pakyong', 'Soreng'],
    popularCities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan', 'Rangpo', 'Jorethang', 'Singtam'],
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    type: 'State',
    districts: [
      'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
      'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur',
      'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris',
      'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga',
      'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
      'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
      'Viluppuram', 'Virudhunagar'
    ],
    popularCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur'],
  },
  {
    code: 'TG',
    name: 'Telangana',
    type: 'State',
    districts: [
      'Adilabad', 'Bhadradri Kothagudem', 'Hanamkonda', 'Hyderabad', 'Jagtial', 'Jangaon',
      'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam',
      'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak',
      'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal',
      'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet',
      'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
    ],
    popularCities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam', 'Mahabubnagar', 'Nalgonda', 'Adilabad', 'Siddipet', 'Secunderabad'],
  },
  {
    code: 'TR',
    name: 'Tripura',
    type: 'State',
    districts: [
      'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'
    ],
    popularCities: ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailashahar', 'Belonia', 'Khowai', 'Ambassa'],
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    type: 'State',
    districts: [
      'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya',
      'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki',
      'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli',
      'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad',
      'Gautam Buddha Nagar (Noida)', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur',
      'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj',
      'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri',
      'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau',
      'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
      'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar',
      'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra',
      'Sultanpur', 'Unnao', 'Varanasi'
    ],
    popularCities: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Noida / Greater Noida', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Ayodhya', 'Jhansi', 'Mathura', 'Firozabad'],
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    type: 'State',
    districts: [
      'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar',
      'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'
    ],
    popularCities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Roorkee', 'Haldwani', 'Kashipur', 'Rudrapur', 'Nainital', 'Mussoorie', 'Pithoragarh'],
  },
  {
    code: 'WB',
    name: 'West Bengal',
    type: 'State',
    districts: [
      'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling',
      'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda',
      'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
      'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
    ],
    popularCities: ['Kolkata', 'Howrah', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman', 'Malda', 'Kharagpur', 'Haldia', 'Darjeeling', 'Baharampur'],
  }
];

export interface SearchLocationResult {
  displayName: string;
  name: string;
  state: string;
  district: string;
  cityOrTown: string;
  pincode?: string;
  latitude: number;
  longitude: number;
  type: 'city' | 'district' | 'town' | 'village' | 'pincode' | 'state';
}

// Fast offline search algorithm across all states, districts, and cities in India
export function searchLocalIndiaLocations(query: string): SearchLocationResult[] {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.toLowerCase().trim();
  const results: SearchLocationResult[] = [];

  // Match states, districts, cities
  for (const st of INDIA_STATES_AND_UTS) {
    // Check popular cities
    for (const city of st.popularCities) {
      if (city.toLowerCase().includes(cleanQuery)) {
        // Approximate coordinates or center offset based on state
        const coords = getApproxCoordsForStateCity(st.name, city);
        results.push({
          displayName: `${city}, ${st.name}`,
          name: city,
          state: st.name,
          district: findDistrictForCity(st, city) || st.districts[0] || city,
          cityOrTown: city,
          latitude: coords.lat,
          longitude: coords.lng,
          type: 'city'
        });
      }
    }

    // Check districts
    for (const dist of st.districts) {
      if (dist.toLowerCase().includes(cleanQuery)) {
        const coords = getApproxCoordsForStateCity(st.name, dist);
        // Avoid duplicate if city and district have same name
        if (!results.some(r => r.name.toLowerCase() === dist.toLowerCase() && r.state === st.name)) {
          results.push({
            displayName: `${dist} District, ${st.name}`,
            name: dist,
            state: st.name,
            district: dist,
            cityOrTown: dist,
            latitude: coords.lat,
            longitude: coords.lng,
            type: 'district'
          });
        }
      }
    }
  }

  return results.slice(0, 8);
}

function findDistrictForCity(state: IndiaState, city: string): string | null {
  const match = state.districts.find(d => city.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(city.toLowerCase()));
  return match || null;
}

// Coordinate mapping for major Indian regions for realistic GIS placement
export function getApproxCoordsForStateCity(stateName: string, cityName?: string): { lat: number; lng: number } {
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    'Bengaluru': { lat: 12.9716, lng: 77.5946 },
    'Mysuru': { lat: 12.2958, lng: 76.6394 },
    'Hubballi-Dharwad': { lat: 15.3647, lng: 75.1240 },
    'Mangaluru': { lat: 12.9141, lng: 74.8560 },
    'Belagavi': { lat: 15.8497, lng: 74.4977 },
    'New Delhi': { lat: 28.6139, lng: 77.2090 },
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Nagpur': { lat: 21.1458, lng: 79.0882 },
    'Nashik': { lat: 19.9975, lng: 73.7898 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Coimbatore': { lat: 11.0168, lng: 76.9558 },
    'Madurai': { lat: 9.9252, lng: 78.1198 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
    'Howrah': { lat: 22.5958, lng: 88.2636 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Warangal': { lat: 17.9689, lng: 79.5941 },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'Surat': { lat: 21.1702, lng: 72.8311 },
    'Vadodara': { lat: 22.3072, lng: 73.1812 },
    'Jaipur': { lat: 26.9124, lng: 75.7873 },
    'Jodhpur': { lat: 26.2389, lng: 73.0243 },
    'Lucknow': { lat: 26.8467, lng: 80.9462 },
    'Kanpur': { lat: 26.4499, lng: 80.3319 },
    'Varanasi': { lat: 25.3176, lng: 82.9739 },
    'Agra': { lat: 27.1767, lng: 78.0081 },
    'Noida / Greater Noida': { lat: 28.5355, lng: 77.3910 },
    'Patna': { lat: 25.5941, lng: 85.1376 },
    'Gaya': { lat: 24.7914, lng: 85.0002 },
    'Bhopal': { lat: 23.2599, lng: 77.4126 },
    'Indore': { lat: 22.7196, lng: 75.8577 },
    'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
    'Kochi': { lat: 9.9312, lng: 76.2673 },
    'Kozhikode': { lat: 11.2588, lng: 75.7804 },
    'Guwahati': { lat: 26.1445, lng: 91.7362 },
    'Bhubaneswar': { lat: 20.2961, lng: 85.8245 },
    'Cuttack': { lat: 20.4625, lng: 85.8828 },
    'Chandigarh': { lat: 30.7333, lng: 76.7794 },
    'Ranchi': { lat: 23.3441, lng: 85.3096 },
    'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
    'Raipur': { lat: 21.2514, lng: 81.6296 },
    'Dehradun': { lat: 30.3165, lng: 78.0322 },
    'Shimla': { lat: 31.1048, lng: 77.1734 },
    'Srinagar': { lat: 34.0837, lng: 74.7973 },
    'Jammu': { lat: 32.7266, lng: 74.8570 },
    'Panaji': { lat: 15.4909, lng: 73.8278 },
    'Amritsar': { lat: 31.6340, lng: 74.8723 },
    'Ludhiana': { lat: 30.9010, lng: 75.8573 },
  };

  if (cityName && cityCoords[cityName]) {
    return cityCoords[cityName];
  }

  // State defaults
  const stateDefaults: Record<string, { lat: number; lng: number }> = {
    'Karnataka': { lat: 12.9716, lng: 77.5946 },
    'Maharashtra': { lat: 19.0760, lng: 72.8777 },
    'Delhi (NCT)': { lat: 28.6139, lng: 77.2090 },
    'Tamil Nadu': { lat: 13.0827, lng: 80.2707 },
    'Telangana': { lat: 17.3850, lng: 78.4867 },
    'West Bengal': { lat: 22.5726, lng: 88.3639 },
    'Gujarat': { lat: 23.0225, lng: 72.5714 },
    'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
    'Rajasthan': { lat: 26.9124, lng: 75.7873 },
    'Kerala': { lat: 10.8505, lng: 76.2711 },
    'Madhya Pradesh': { lat: 22.9734, lng: 78.6569 },
    'Bihar': { lat: 25.0961, lng: 85.3131 },
    'Punjab': { lat: 31.1471, lng: 75.3412 },
    'Haryana': { lat: 29.0588, lng: 76.0856 },
    'Odisha': { lat: 20.9517, lng: 85.0985 },
    'Assam': { lat: 26.2006, lng: 92.9376 },
    'Jharkhand': { lat: 23.6102, lng: 85.2799 },
    'Chhattisgarh': { lat: 21.2787, lng: 81.8661 },
    'Uttarakhand': { lat: 30.0668, lng: 79.0193 },
    'Himachal Pradesh': { lat: 31.1048, lng: 77.1734 },
    'Goa': { lat: 15.2993, lng: 74.1240 },
    'Jammu and Kashmir': { lat: 33.7782, lng: 76.5762 },
    'Ladakh': { lat: 34.1526, lng: 77.5771 },
    'Andhra Pradesh': { lat: 15.9129, lng: 79.7400 },
  };

  return stateDefaults[stateName] || { lat: 20.5937, lng: 78.9629 };
}
