SpendWise: Personal Expense and Income Tracking Application

SpendWise is a cross-platform mobile application developed using React Native, Expo, and Expo Router. The system enables users to monitor personal financial transactions, record income and expenses, review categorized transaction lists, and receive local notifications upon data entry.

System Features and Requirements

Navigation and Routing:

Utilizes Expo Router to structure the application using bottom tabs for primary navigation and a nested stack layout for secondary detail views.

Master List and Filtering:

Implements FlatList components for rendering transaction records.

Includes a Modal component enabling users to filter financial records by category and transaction type.

Background and Foreground State Management:

Incorporates the React Native AppState API to monitor application lifecycle changes and detect when the software resumes from background states.

Local Notifications:

Integrates the expo-notifications module to dispatch alerts upon successfully saving income or expense records.

Persistent Local Storage:

Employs AsyncStorage to save transaction data locally on the device, ensuring state consistency across screen navigation.

Project Directory Structure

src/
└── app/
    ├── _layout.tsx                 # Root layout for stack navigation
    ├── transaction-detail.tsx      # Static detail view screen
    └── (tabs)/                     # Tab route group container
        ├── _layout.tsx             # Bottom tab configuration and icons
        ├── index.tsx               # Dashboard screen with AppState listener
        ├── transactions.tsx        # Master list screen with FlatList and Modal
        └── add.tsx                 # Form screen for data entry and notifications


Setup and Installation Instructions

Open the project directory in your terminal:

cd SpendWise/SpendWise


Install dependencies:

npm install


Install required Expo packages:

npx expo install @expo/vector-icons expo-notifications @react-native-async-storage/async-storage


Run the development server:

npx expo start


Demonstration Video

Link: [https://drive.google.com/file/d/1iYFXbHJqHk1X9LQ-ZMUpvcZB21SevfQO/view?usp=sharing]