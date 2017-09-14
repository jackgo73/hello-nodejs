package com.jackgo.firstapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        LinearLayout root = (LinearLayout) findViewById(R.id.root);
//        final DrawView draw = new DrawView(this);
//        draw.setMinimumHeight(500);
//        draw.setMinimumWidth(300);
//        root.addView(draw);
    }
}
