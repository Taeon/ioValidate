<?php
use PHPUnit\Framework\TestCase;

class ValidatorMaxLengthTest extends TestCase
{
	public function testMax()
    {

		$validator = new \ioValidate\Validator\maxlength( array( 'value' => 5 ) );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values();

		// Equal
		$this->assertTrue( $validator->Validate( '12345', $values ) );
		// Shorter
		$this->assertTrue( $validator->Validate( '1234', $values ) );

		// longer -- should fail
		$this->assertFalse( $validator->Validate( '123456', $values ) );

    }
}
?>
