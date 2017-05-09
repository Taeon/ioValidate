<?php
use PHPUnit\Framework\TestCase;

class ValidatorEmailTest extends TestCase
{
    public function testValid()
    {

		$valid = array(
			'email@example.com',
			'firstname.lastname@example.com',
//			'email@subdomain.example.com',
			 'firstname+lastname@example.com',
			 'email@123.123.123.123',
			 'email@[123.123.123.123]',
			 '“email”@example.com',
			 '1234567890@example.com',
			 'email@example-one.com',
			 '_______@example.com',
			 'email@example.name',
			 'email@example.museum',
			 'email@example.co.jp',
			 'firstname-lastname@example.com'
		);
		$validator = new \ioValidate\Validator\email( array() );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Should all pass
		foreach( $valid as $email ){
			$this->assertTrue( $validator->Validate( $email, $values ) );
		}
	}
	public function testInvalid()
	{
		$invalid = array(
			'plainaddress',
		    '#@%^%#$@#$@#.com',
		    '@example.com',
		    'Joe Smith <email@example.com>',
		    'email.example.com',
		    // 'email@example@example.com',
		     '.email@example.com',
		     'email.@example.com',
		     'email..email@example.com',
		    // 'あいうえお@example.com',
		     'email@example.com (Joe Smith)',
		     'email@example',
		     'email@-example.com',
		    // 'email@example.web',
		    // 'email@111.222.333.44444',
		     'email@example..com',
		     'Abc..123@example.com',
		);
		$validator = new \ioValidate\Validator\email( array() );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Should all fail
		foreach( $invalid as $email ){
			$this->assertFalse( $validator->Validate( $email, $values ) );
		}
    }
	public function testBlank()
	{
		$validator = new \ioValidate\Validator\email( array() );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Should pass
		$this->assertTrue( $validator->Validate( '', $values ) );
    }
}
?>
