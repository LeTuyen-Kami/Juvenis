<?php
if (!defined('ABSPATH')) {
    // It prevent public user to directly access your .php files through URL
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('jm-quiz', '/client-result', array(
        'methods' => 'POST',
        'callback' => 'jm_quiz_save_client_result',
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('jm-quiz', '/get-quiz-result', array(
        'methods' => 'POST',
        'callback' => 'jm_quiz_get_quiz_result',
		'permission_callback' => '__return_true', // Cho phép truy cập API
    ));
});

function jm_quiz_get_quiz_result($request)
{
    try {
        global $wpdb, $jm_quiz_table_name;

        $parameters = $request->get_json_params();
        $quiz_type = sanitize_text_field($parameters['type']);
        $current_lang = pll_current_language();

        if (empty($quiz_type)) {
            return new WP_Error('error', 'Missing quiz type', array('status' => 400));
        }

        $query = $wpdb->prepare(
            "SELECT * FROM $jm_quiz_table_name WHERE category = %s AND lang = %s",
            $quiz_type,
            $current_lang
        );

        $results = $wpdb->get_results($query);

        if (!$results) {
            return new WP_Error('error', 'No results found', array('status' => 404));
        }

        foreach ($results as $result) {
            $result->content = json_decode($result->content);
        }

        return rest_ensure_response($results);
    } catch (Exception $e) {
        return new WP_Error('error', 'Failed to retrieve data', array('status' => 500));
    }
}

function jm_quiz_save_client_result($request)
{
    try {
        global $wpdb, $jm_quiz_report_table_name;

        $parameters = $request->get_json_params(); // Get JSON parameters from the request body
        $report = array(
            'full_name' => sanitize_text_field($parameters['full_name']),
            'year_of_birth' => sanitize_text_field($parameters['year_of_birth']),
            'phone_number' => sanitize_text_field($parameters['phone_number']),
            'email' => sanitize_email($parameters['email']),
            'school' => sanitize_text_field($parameters['school']),
            'result' => wp_strip_all_tags(str_replace("<br>", "\n\n", $parameters['result'])),
            'category' => sanitize_text_field($parameters['category'])
        );

        $result = $wpdb->insert($jm_quiz_report_table_name, $report);

        // if ($result) {
        //     $admin_email = 'info@juvenismaxime.com,angie.nguyen@juvenismaxime.com';
        //     $subject = 'New Quiz Result Submission';
        //     $message = "A new participant has completed the quiz:\n\n";
        //     $message .= "Full Name: " . $report['full_name'] . "\n";
        //     $message .= "Year of Birth: " . $report['year_of_birth'] . "\n";
        //     $message .= "Phone Number: " . $report['phone_number'] . "\n";
        //     $message .= "Email: " . $report['email'] . "\n";
        //     $message .= "School: " . $report['school'] . "\n";
        //     $message .= "Result: " . $report['result'] . "\n";
        //     $message .= "Category: " . $report['category'] . "\n\n";
        //     $message .= "Best regards,\nSupport Team.";

        //     $headers = array('Content-Type: text/plain; charset=UTF-8');

        //     wp_mail($admin_email, $subject, $message, $headers);

        //     return rest_ensure_response($result);
        // } else {
        //     return new WP_Error('error', 'Failed', array('status' => 500));
        // }
    } catch (Exception $e) {
        return new WP_Error('error', 'Failed', array('status' => 500));
    }
}
