import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import theme from "../../helpers/theme";
import { Formik } from "formik";
import MultiSelect from "react-native-multiple-select";

const NeetPredictor = () => {
  const [activeType, setActiveType] = useState(0);
  const [activeCategoryType, setActiveCategoryType] = useState(0);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => setActiveType(1)}
          style={{
            borderRadius: 20,
            width: "45%",
            padding: 15,
            alignItems: "center",
            backgroundColor:
              activeType === 1 ? theme.colors.primary : theme.colors.secondary,
          }}
        >
          <Text style={{ color: theme.colors.white }}>MBBS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveType(2)}
          style={{
            borderRadius: 20,
            width: "45%",
            padding: 15,
            alignItems: "center",
            backgroundColor:
              activeType === 2 ? theme.colors.primary : theme.colors.secondary,
          }}
        >
          <Text style={{ color: theme.colors.white }}>AYUSH</Text>
        </TouchableOpacity>
      </View>
      {activeType === 1 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveCategoryType(1)}
            style={{
              borderRadius: 20,
              width: "30%",
              padding: 15,
              alignItems: "center",
              backgroundColor:
                activeCategoryType === 1
                  ? theme.colors.primary
                  : theme.colors.secondary,
            }}
          >
            <Text style={{ color: theme.colors.white }}>All India</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveCategoryType(2)}
            style={{
              borderRadius: 20,
              width: "30%",
              padding: 15,
              alignItems: "center",
              backgroundColor:
                activeCategoryType === 2
                  ? theme.colors.primary
                  : theme.colors.secondary,
            }}
          >
            <Text style={{ color: theme.colors.white }}>State</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveCategoryType(3)}
            style={{
              borderRadius: 20,
              width: "30%",
              padding: 15,
              alignItems: "center",
              backgroundColor:
                activeCategoryType === 3
                  ? theme.colors.primary
                  : theme.colors.secondary,
            }}
          >
            <Text style={{ color: theme.colors.white }}>Others</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ backgroundColor: "green", width: 100, height: 100 }}>
        <AllIndiaPredictor />
      </View>
    </View>
  );
};

export default NeetPredictor;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
});

const AllIndiaPredictor = () => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState([]);

  const getFeidlValue = (formKey, formValue, fieldValue) => {
    console.log(formKey, "hello");
    delete formValue["rank"];
    const dataObject = { ...formValue };
    Object.keys(dataObject).map((val) =>
      dataObject[val].length === 0 ? delete dataObject[val] : null
    );
    if (!dataObject[formKey]) {
      dataObject[formKey] = fieldValue;
    } else {
      dataObject[formKey] = [];
    }
    setLoading(true);
    serverUnauth
      .post(`/neet-dropdown`, dataObject)
      .then((res) => {
        console.log(res?.data, "hiiiiiiasdf");
        setMasterData(res?.data?.data);
        const dataSet = res?.data?.data;
        const newObject = {};
        dataSet.map((val, index) =>
          Object.keys(val).map((val1) => {
            if (val1 in newObject) {
              newObject[val1].push(dataSet[index][val1]);
            } else {
              newObject[val1] = [dataSet[index][val1]];
            }
          })
        );
        console.log(newObject, "new");
        Object.keys(newObject).map(
          (val) =>
            (newObject[val] = newObject[val].filter(
              (item, index) => newObject[val].indexOf(item) === index
            ))
        );
        console.log(newObject, "hello world");
        setData(newObject);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(data, "data");

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      }
    }
    console.log(reqObject, "reqObject");
    serverUnauth
      .post(`/predict-neet`, reqObject)
      .then((res) => {
        console.log(res.data);
        setPredictData([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedFieldValue = (masterData, values) => {
    const dataSet = masterData;
    const newObject = {};
    for (let index = 0; index < dataSet.length; index++) {
      Object.keys(values).map((valueKey) => {
        if (valueKey !== "rank") {
          if (
            values[valueKey].includes(dataSet[index][valueKey]) ||
            values[valueKey].length === 0
          ) {
            console.log(dataSet[index]);
            if (valueKey in newObject) {
              newObject[valueKey].push(dataSet[index][valueKey]);
            } else {
              newObject[valueKey] = [dataSet[index][valueKey]];
            }
          }
        }
      });
    }
    Object.keys(newObject).map(
      (val) =>
        (newObject[val] = newObject[val].filter(
          (item, index) => newObject[val].indexOf(item) === index
        ))
    );
    console.log(newObject, "hello world");
    setData(newObject);
  };

  return (
    <View>
      <Formik
        initialValues={{
          course: [],
          round: [],
          allottedPH: [],
          quota: [],
          allottedCategory: [],
          instituteName: [],
          rank: 0,
        }}
        // validationSchema={signUpalidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue }) => {
          Object.keys(values)?.map((val, index) => {
            console.log(val, index , "yo");
            if (val !== "rank") {
              return (
                <TouchableOpacity
                  style={{ backgroundColor: "red", padding: 30 }}
                  onPress={() => getFeidlValue(val, values, values[val])}
                >
                  <Text>Select</Text>
                </TouchableOpacity>
              );
            }
            return (
              <View
                style={{
                  flex: 1,
                  width: 150,
                  height: 100,
                  backgroundColor: "red",
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "red", padding: 30 }}
                  onPress={() => getFeidlValue(val, values, values[val])}
                >
                  <Text>Select</Text>
                </TouchableOpacity>
                <MultiSelect
                  hideTags
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Baseball", value: "baseball" },
                    { label: "Hockey", value: "hockey" },
                  ]}
                  uniqueKey="label"
                  ref={(component) => {
                    this.multiSelect = component;
                  }}
                  // onSelectedItemsChange={onSelectedItemsChange}
                  // selectedItems={selectedItems}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={(text) => console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
            );
          });
        }}
      </Formik>
    </View>
  );
};
