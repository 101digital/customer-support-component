package com.d101.countrycode;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.telephony.TelephonyManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class CountryCodeModule extends ReactContextBaseJavaModule {
    ReactApplicationContext context;

    CountryCodeModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "CountryCodeModule";
    }


    @ReactMethod
    public void getDeviceCountryCode(Promise promise) {
        try {
            String countryCode;

            // Try to get country code from TelephonyManager service
            TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            if(tm != null) {
                // Query first getSimCountryIso()
                countryCode = tm.getSimCountryIso();
                if (countryCode != null && countryCode.length() == 2){
                    promise.resolve(countryCode.toUpperCase());
                    return;
                }
                if (tm.getPhoneType() == TelephonyManager.PHONE_TYPE_CDMA) {
                    // Special case for CDMA Devices
                    countryCode = getCDMACountryIso();
                }
                else {
                    // For 3G devices (with SIM) query getNetworkCountryIso()
                    countryCode = tm.getNetworkCountryIso();
                }

                if (countryCode != null && countryCode.length() == 2){
                    promise.resolve(countryCode.toUpperCase());
                    return ;
                }
            }

            // If network country not available (tablets maybe), get country code from Locale class
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                countryCode = context.getResources().getConfiguration().getLocales().get(0).getCountry();
            }
            else {
                countryCode = context.getResources().getConfiguration().locale.getCountry();
            }

            if (countryCode.length() == 2){
                promise.resolve(countryCode.toUpperCase());
                return;
            }
            // General fallback to "us"
            promise.resolve("SG");
        }catch (Exception e){
            promise.reject("Country code error", e);
        }
    }

    @SuppressLint("PrivateApi")
    private static String getCDMACountryIso() {
        try {
            // Try to get country code from SystemProperties private class
            Class<?> systemProperties = Class.forName("android.os.SystemProperties");
            Method get = systemProperties.getMethod("get", String.class);

            // Get homeOperator that contain MCC + MNC
            String homeOperator = ((String) get.invoke(systemProperties,
                    "ro.cdma.home.operator.numeric"));

            // First three characters (MCC) from homeOperator represents the country code
            int mcc = 0;
            if (homeOperator != null) {
                mcc = Integer.parseInt(homeOperator.substring(0, 3));
            }

            // Mapping just countries that actually use CDMA networks
            switch (mcc) {
                case 330: return "PR";
                case 310:
                case 311:
                case 312:
                case 316: return "US";
                case 283: return "AM";
                case 460: return "CN";
                case 455: return "MO";
                case 414: return "MM";
                case 619: return "SL";
                case 450: return "KR";
                case 634: return "SD";
                case 434: return "UZ";
                case 232: return "AT";
                case 204: return "NL";
                case 262: return "DE";
                case 247: return "LV";
                case 255: return "UA";
                case 525: return "SG";

            }
        }
        catch (ClassNotFoundException ignored) {
        }
        catch (NoSuchMethodException ignored) {
        }
        catch (IllegalAccessException ignored) {
        }
        catch (InvocationTargetException ignored) {
        }
        catch (NullPointerException ignored) {
        }

        return null;
    }
}
